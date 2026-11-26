"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export interface SchoolNewsScrollState {
  /** 0..1 across the whole page */
  globalProgress: number;
  /** 0..1 within Section 01 Hero */
  heroUnfold: number;
  /** 0..1 within Section 02 Latest News */
  latestProgress: number;
  /** 0..1 within Section 03 Academic Highlights */
  academicsProgress: number;
  /** 0..1 within Section 04 Sports & Activities */
  sportsProgress: number;
  /** 0..1 within Section 05 Creative Corner */
  creativeProgress: number;
  /** 0..1 within Section 06 Campus Moments */
  momentsProgress: number;
  /** 0..1 within Section 07 Announcements */
  announcementsProgress: number;
}

interface SchoolNews3DStageProps {
  scrollStateRef: React.MutableRefObject<SchoolNewsScrollState>;
  reducedMotion: boolean;
  isMobile: boolean;
  className?: string;
}

function createMatteClay(color: number, roughness = 0.42, metalness = 0.05) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness,
    metalness,
  });
}

function createCartoonEyes(scale = 1) {
  const group = new THREE.Group();
  const whiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.25 });
  const pupilMat = new THREE.MeshStandardMaterial({ color: 0x111521, roughness: 0.15 });
  const glintMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

  [-0.14 * scale, 0.14 * scale].forEach((x) => {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.11 * scale, 16, 16), whiteMat);
    eye.scale.set(1, 1.25, 0.72);
    eye.position.set(x, 0, 0);

    const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.058 * scale, 14, 14), pupilMat);
    pupil.position.set(0, -0.01 * scale, 0.068 * scale);
    eye.add(pupil);

    const glint = new THREE.Mesh(new THREE.SphereGeometry(0.02 * scale, 10, 10), glintMat);
    glint.position.set(0.022 * scale, 0.024 * scale, 0.048 * scale);
    pupil.add(glint);

    group.add(eye);
  });

  return group;
}

/** Red Pencil Sharpener + Unfolding Paper Scroll (Hero centerpiece) */
function buildSharpenerAndScroll() {
  const root = new THREE.Group();

  // Red Pencil Sharpener Body
  const sharpener = new THREE.Group();
  const redEnamel = new THREE.MeshPhysicalMaterial({
    color: 0xe53935,
    roughness: 0.28,
    metalness: 0.12,
    clearcoat: 0.45,
    clearcoatRoughness: 0.25,
  });
  const metalMat = new THREE.MeshStandardMaterial({
    color: 0xd9e0ec,
    roughness: 0.25,
    metalness: 0.85,
  });
  const darkSlotMat = createMatteClay(0x1b2234, 0.6);

  const body = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.86, 0.78), redEnamel);
  body.castShadow = true;
  body.receiveShadow = true;
  sharpener.add(body);

  // Tapered grip ridges on sides
  [-0.6, 0.6].forEach((x) => {
    const grip = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.68, 0.62), createMatteClay(0xc62828, 0.4));
    grip.position.set(x, 0, 0);
    sharpener.add(grip);
  });

  // Top metallic blade & screw
  const blade = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.06, 0.46), metalMat);
  blade.position.set(0.06, 0.44, 0);
  blade.rotation.z = -0.14;
  sharpener.add(blade);

  const screw = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.08, 16), metalMat);
  screw.position.set(-0.14, 0.47, 0.08);
  sharpener.add(screw);

  // Pencil entry cone hole
  const coneHole = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.06, 0.34, 20), darkSlotMat);
  coneHole.rotation.z = Math.PI / 2;
  coneHole.position.set(-0.45, 0, 0);
  sharpener.add(coneHole);

  sharpener.position.set(-1.35, 0, 0);
  root.add(sharpener);

  // Multi-segment unfolding parchment ribbon emerging from sharpener
  const scrollSegments: THREE.Mesh[] = [];
  const paperMat = new THREE.MeshStandardMaterial({
    color: 0xfdf5e2,
    roughness: 0.78,
    metalness: 0.02,
    side: THREE.DoubleSide,
  });

  let parentNode: THREE.Object3D = sharpener;
  const segCount = 7;
  const segWidth = 0.42;
  for (let i = 0; i < segCount; i++) {
    const pivot = new THREE.Group();
    pivot.position.set(i === 0 ? 0.56 : segWidth, 0, 0);
    const segMesh = new THREE.Mesh(new THREE.PlaneGeometry(segWidth + 0.02, 1.35), paperMat);
    segMesh.position.set(segWidth * 0.5, 0, 0);
    segMesh.castShadow = true;
    pivot.add(segMesh);
    parentNode.add(pivot);
    scrollSegments.push(segMesh);
    parentNode = pivot;
  }

  return { root, sharpener, scrollSegments };
}

/** Animated Pencil Character */
function buildPencilCharacter() {
  const group = new THREE.Group();
  const yellowMat = createMatteClay(0xffd52a, 0.35);
  const woodMat = createMatteClay(0xe8be88, 0.65);
  const leadMat = createMatteClay(0x1b2030, 0.3);
  const ferruleMat = new THREE.MeshStandardMaterial({ color: 0xd5dce6, metalness: 0.85, roughness: 0.25 });
  const eraserMat = createMatteClay(0xf06277, 0.55);

  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 1.9, 6), yellowMat);
  shaft.castShadow = true;
  group.add(shaft);

  const woodCone = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.56, 12), woodMat);
  woodCone.position.y = 1.23;
  group.add(woodCone);

  const leadTip = new THREE.Mesh(new THREE.ConeGeometry(0.095, 0.22, 12), leadMat);
  leadTip.position.y = 1.44;
  group.add(leadTip);

  const ferrule = new THREE.Mesh(new THREE.CylinderGeometry(0.29, 0.29, 0.26, 20), ferruleMat);
  ferrule.position.y = -1.06;
  group.add(ferrule);

  const eraser = new THREE.Mesh(new THREE.CylinderGeometry(0.27, 0.27, 0.28, 20), eraserMat);
  eraser.position.y = -1.3;
  group.add(eraser);

  const eyes = createCartoonEyes(0.92);
  eyes.position.set(0, 0.32, 0.26);
  group.add(eyes);

  // Smile
  const smile = new THREE.Mesh(
    new THREE.TorusGeometry(0.11, 0.025, 10, 20, Math.PI),
    createMatteClay(0x111521, 0.4)
  );
  smile.rotation.z = Math.PI;
  smile.position.set(0, 0.1, 0.27);
  group.add(smile);

  return group;
}

/** Smiling Notebook Character */
function buildNotebookCharacter() {
  const group = new THREE.Group();
  const coverMat = createMatteClay(0xffd52a, 0.42);
  const pageMat = createMatteClay(0xfdf7e7, 0.72);
  const wireMat = new THREE.MeshStandardMaterial({ color: 0xc8d2e3, metalness: 0.8, roughness: 0.25 });
  const redRibbonMat = createMatteClay(0xe53935, 0.45);

  const cover = new THREE.Mesh(new THREE.BoxGeometry(1.15, 1.45, 0.22), coverMat);
  cover.castShadow = true;
  group.add(cover);

  const pages = new THREE.Mesh(new THREE.BoxGeometry(1.06, 1.37, 0.16), pageMat);
  pages.position.set(0.06, 0, 0.01);
  group.add(pages);

  // Spiral rings
  for (let i = -3; i <= 3; i++) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.085, 0.02, 8, 16), wireMat);
    ring.rotation.y = Math.PI / 2;
    ring.position.set(-0.58, i * 0.19, 0.02);
    group.add(ring);
  }

  const bookmark = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.48, 0.04), redRibbonMat);
  bookmark.position.set(0.28, -0.78, 0.08);
  group.add(bookmark);

  const eyes = createCartoonEyes(0.85);
  eyes.position.set(0.05, 0.2, 0.13);
  group.add(eyes);

  const smile = new THREE.Mesh(
    new THREE.TorusGeometry(0.13, 0.024, 10, 20, Math.PI),
    createMatteClay(0x111521, 0.4)
  );
  smile.rotation.z = Math.PI;
  smile.position.set(0.05, -0.02, 0.13);
  group.add(smile);

  return group;
}

/** Flying Origami Paper Airplane */
function buildPaperAirplane() {
  const group = new THREE.Group();
  const paperMat = new THREE.MeshStandardMaterial({
    color: 0xfff8e7,
    roughness: 0.65,
    metalness: 0.04,
    side: THREE.DoubleSide,
  });

  const leftWingGeo = new THREE.BufferGeometry();
  leftWingGeo.setAttribute(
    "position",
    new THREE.BufferAttribute(new Float32Array([0, 0, 0.9, -0.75, 0.08, -0.7, 0, -0.06, -0.65]), 3)
  );
  leftWingGeo.computeVertexNormals();

  const rightWingGeo = new THREE.BufferGeometry();
  rightWingGeo.setAttribute(
    "position",
    new THREE.BufferAttribute(new Float32Array([0, 0, 0.9, 0, -0.06, -0.65, 0.75, 0.08, -0.7]), 3)
  );
  rightWingGeo.computeVertexNormals();

  const keelGeo = new THREE.BufferGeometry();
  keelGeo.setAttribute(
    "position",
    new THREE.BufferAttribute(new Float32Array([0, 0, 0.9, 0, -0.06, -0.65, 0, -0.3, -0.6]), 3)
  );
  keelGeo.computeVertexNormals();

  const leftWing = new THREE.Mesh(leftWingGeo, paperMat);
  const rightWing = new THREE.Mesh(rightWingGeo, paperMat);
  const keel = new THREE.Mesh(keelGeo, createMatteClay(0xefe0bc, 0.75));
  group.add(leftWing, rightWing, keel);
  return group;
}

/** Rotating 3D Globe on Stand */
function buildGlobe() {
  const group = new THREE.Group();
  const oceanMat = createMatteClay(0x1565c0, 0.35, 0.08);
  const landMat = createMatteClay(0xffd52a, 0.5);
  const standMat = createMatteClay(0xe53935, 0.35, 0.2);

  const sphereGroup = new THREE.Group();
  const ocean = new THREE.Mesh(new THREE.SphereGeometry(0.72, 24, 24), oceanMat);
  sphereGroup.add(ocean);

  // Stylized continent patches
  const patchPositions: [number, number, number, number][] = [
    [0.45, 0.32, 0.45, 0.25],
    [-0.5, 0.25, 0.42, 0.22],
    [0.18, -0.35, 0.58, 0.24],
    [-0.25, -0.15, -0.62, 0.26],
  ];
  patchPositions.forEach(([x, y, z, r]) => {
    const patch = new THREE.Mesh(new THREE.SphereGeometry(r, 14, 14), landMat);
    patch.position.set(x, y, z);
    patch.scale.set(1.2, 0.85, 0.6);
    sphereGroup.add(patch);
  });

  sphereGroup.rotation.z = 0.35;
  group.add(sphereGroup);

  const arc = new THREE.Mesh(new THREE.TorusGeometry(0.84, 0.045, 12, 32, Math.PI * 1.25), standMat);
  arc.rotation.z = -0.3;
  group.add(arc);

  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.46, 0.14, 20), standMat);
  base.position.y = -0.95;
  group.add(base);

  return { group, sphereGroup };
}

/** Animated Opening Book */
function buildOpeningBook() {
  const root = new THREE.Group();
  const coverMat = createMatteClay(0xe53935, 0.4);
  const pageMat = createMatteClay(0xfdf6e4, 0.75);

  const leftHalf = new THREE.Group();
  const leftCover = new THREE.Mesh(new THREE.BoxGeometry(0.76, 1.08, 0.08), coverMat);
  leftCover.position.set(-0.38, 0, 0);
  const leftPage = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.0, 0.09), pageMat);
  leftPage.position.set(-0.36, 0, 0.05);
  leftHalf.add(leftCover, leftPage);

  const rightHalf = new THREE.Group();
  const rightCover = new THREE.Mesh(new THREE.BoxGeometry(0.76, 1.08, 0.08), coverMat);
  rightCover.position.set(0.38, 0, 0);
  const rightPage = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.0, 0.09), pageMat);
  rightPage.position.set(0.36, 0, 0.05);
  rightHalf.add(rightCover, rightPage);

  root.add(leftHalf, rightHalf);
  return { root, leftHalf, rightHalf };
}

/** 3D Sports Ball + Golden Trophy */
function buildSportsTrophyAndBall() {
  const group = new THREE.Group();
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xffd52a,
    roughness: 0.22,
    metalness: 0.72,
  });
  const baseMat = createMatteClay(0x161c2e, 0.4);

  const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.44, 0.24, 0.65, 20), goldMat);
  cup.position.y = 0.25;
  group.add(cup);

  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.14, 0.4, 16), goldMat);
  stem.position.y = -0.25;
  group.add(stem);

  const pedestal = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.24, 0.62), baseMat);
  pedestal.position.y = -0.54;
  group.add(pedestal);

  [-0.45, 0.45].forEach((x) => {
    const handle = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.04, 10, 20, Math.PI), goldMat);
    handle.rotation.z = x > 0 ? -Math.PI / 2 : Math.PI / 2;
    handle.position.set(x, 0.3, 0);
    group.add(handle);
  });

  // Sports ball orbiting beside trophy
  const ball = new THREE.Group();
  const ballSphere = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.42, 1),
    createMatteClay(0xff6b2c, 0.42)
  );
  const stripe = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.025, 8, 24), createMatteClay(0x111521, 0.5));
  ball.add(ballSphere, stripe);
  ball.position.set(1.1, -0.15, 0.2);
  group.add(ball);

  return { group, ball };
}

/** Small Student Cartoon Mascot */
function buildStudentMascot() {
  const group = new THREE.Group();
  const skinMat = createMatteClay(0xf6c39b, 0.5);
  const shirtMat = createMatteClay(0xffd52a, 0.42);
  const capMat = createMatteClay(0xe53935, 0.4);

  const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.3, 0.62, 16), shirtMat);
  torso.position.y = -0.28;
  group.add(torso);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.32, 20, 20), skinMat);
  head.position.y = 0.24;
  group.add(head);

  // Cap
  const capDome = new THREE.Mesh(new THREE.SphereGeometry(0.33, 18, 14, 0, Math.PI * 2, 0, Math.PI * 0.52), capMat);
  capDome.position.y = 0.28;
  group.add(capDome);

  const brim = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.05, 0.32), capMat);
  brim.position.set(0, 0.3, 0.26);
  group.add(brim);

  const eyes = createCartoonEyes(0.7);
  eyes.position.set(0, 0.22, 0.29);
  group.add(eyes);

  return group;
}

/** Floating 3D Star */
function buildStar(colorHex: number) {
  const shape = new THREE.Shape();
  const outer = 0.28;
  const inner = 0.13;
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const angle = (i * Math.PI) / 5 - Math.PI / 2;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.09,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.03,
    bevelSegments: 2,
  });
  geo.center();
  return new THREE.Mesh(geo, createMatteClay(colorHex, 0.3, 0.2));
}

export default function SchoolNews3DStage({
  scrollStateRef,
  reducedMotion,
  isMobile,
  className = "",
}: SchoolNews3DStageProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isMobile,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.shadowMap.enabled = !isMobile;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      isMobile ? 48 : 38,
      container.clientWidth / Math.max(container.clientHeight, 1),
      0.1,
      60
    );
    camera.position.set(0, 0, 12);

    // Studio Lighting for warm clay/stationery look
    const hemi = new THREE.HemisphereLight(0xfff8e7, 0x062568, 1.15);
    scene.add(hemi);

    const keyLight = new THREE.DirectionalLight(0xfff2d6, 2.0);
    keyLight.position.set(6, 8, 9);
    keyLight.castShadow = !isMobile;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x66a3ff, 1.05);
    rimLight.position.set(-7, -3, 5);
    scene.add(rimLight);

    // Build 3D Characters & Educational Objects
    const heroRig = buildSharpenerAndScroll();
    scene.add(heroRig.root);

    const pencilChar = buildPencilCharacter();
    scene.add(pencilChar);

    const notebookChar = buildNotebookCharacter();
    scene.add(notebookChar);

    const paperPlane = buildPaperAirplane();
    scene.add(paperPlane);

    const globeRig = buildGlobe();
    scene.add(globeRig.group);

    const bookRig = buildOpeningBook();
    scene.add(bookRig.root);

    const sportsRig = buildSportsTrophyAndBall();
    scene.add(sportsRig.group);

    const studentMascot = buildStudentMascot();
    scene.add(studentMascot);

    const starColors = [0xffd52a, 0xff6b2c, 0xffd52a, 0xe53935];
    const stars = starColors.map((c) => {
      const s = buildStar(c);
      scene.add(s);
      return s;
    });

    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth;
      const h = Math.max(container.clientHeight, 1);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    let rafId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      rafId = window.requestAnimationFrame(animate);
      const t = reducedMotion ? 0 : clock.getElapsedTime();
      const s = scrollStateRef.current;
      const mobileFactor = isMobile ? 0.64 : 1;

      // 1. Hero Sharpener & Unfolding Scroll (oversized -> scales down & exits upward on scroll)
      const heroScale = THREE.MathUtils.lerp(1.22, 0.56, s.heroUnfold) * mobileFactor;
      heroRig.root.scale.setScalar(heroScale);
      heroRig.root.position.set(
        THREE.MathUtils.lerp(-2.4, -3.8, s.heroUnfold) * mobileFactor,
        THREE.MathUtils.lerp(1.3, 4.9, s.heroUnfold),
        THREE.MathUtils.lerp(0.6, -2.5, s.heroUnfold)
      );
      heroRig.root.rotation.set(
        THREE.MathUtils.lerp(0.18, -0.35, s.heroUnfold),
        THREE.MathUtils.lerp(-0.22, 0.35, s.heroUnfold),
        THREE.MathUtils.lerp(-0.08, 0.06, s.heroUnfold)
      );

      // Curl/uncurl scroll segments based on heroUnfold
      heroRig.scrollSegments.forEach((seg, idx) => {
        const pivot = seg.parent;
        if (!pivot) return;
        const curlAngle = THREE.MathUtils.lerp(0.62, 0.05, s.heroUnfold);
        pivot.rotation.y = curlAngle * (idx % 2 === 0 ? 1 : 0.75);
      });

      // 2. Animated Pencil Character travels across sections 01 -> 03 -> 05
      const pBob = reducedMotion ? 0 : Math.sin(t * 1.8) * 0.12;
      pencilChar.position.set(
        (isMobile ? 2.1 : 4.2) * Math.cos(s.globalProgress * Math.PI * 1.6),
        THREE.MathUtils.lerp(-1.2, 1.4, Math.sin(s.globalProgress * Math.PI)) + pBob,
        0.3
      );
      pencilChar.scale.setScalar(THREE.MathUtils.lerp(1.15, 0.78, s.globalProgress) * mobileFactor);
      pencilChar.rotation.set(0.15, s.globalProgress * Math.PI * 2.2, -0.28 + Math.sin(s.globalProgress * 8) * 0.15);

      // 3. Flying Paper Airplane glides diagonally across scroll
      paperPlane.position.set(
        THREE.MathUtils.lerp(-5.2, 5.4, s.globalProgress) * mobileFactor,
        THREE.MathUtils.lerp(2.4, -1.6, s.globalProgress) + Math.sin(s.globalProgress * Math.PI * 3) * 0.85,
        1.1
      );
      paperPlane.scale.setScalar(THREE.MathUtils.lerp(1.1, 0.75, s.globalProgress) * mobileFactor);
      paperPlane.rotation.set(
        -0.25 + Math.cos(s.globalProgress * 8) * 0.15,
        Math.PI * 0.42,
        -0.18 + Math.sin(s.globalProgress * 6) * 0.2
      );

      // 4. Smiling Notebook + Opening Book + Globe (prominent in Academic Highlights 03)
      const acadWeight = Math.sin(Math.min(Math.max(s.academicsProgress, 0), 1) * Math.PI);
      notebookChar.position.set(
        THREE.MathUtils.lerp(-5.8, -3.7, acadWeight) * mobileFactor,
        THREE.MathUtils.lerp(-3.5, 0.1, acadWeight),
        0.2
      );
      notebookChar.scale.setScalar((0.35 + acadWeight * 0.65) * mobileFactor);
      notebookChar.rotation.y = THREE.MathUtils.lerp(-0.8, 0.35, s.academicsProgress);

      globeRig.group.position.set(
        THREE.MathUtils.lerp(6.0, 3.9, acadWeight) * mobileFactor,
        THREE.MathUtils.lerp(2.8, -0.5, acadWeight),
        0.1
      );
      globeRig.group.scale.setScalar((0.25 + acadWeight * 0.75) * mobileFactor);
      globeRig.sphereGroup.rotation.y = s.globalProgress * Math.PI * 5 + t * 0.2;

      bookRig.root.position.set(
        THREE.MathUtils.lerp(4.8, 2.8, acadWeight) * mobileFactor,
        THREE.MathUtils.lerp(-3.2, 1.5, acadWeight),
        0.4
      );
      bookRig.root.scale.setScalar((0.2 + acadWeight * 0.65) * mobileFactor);
      const bookOpen = THREE.MathUtils.lerp(1.2, 0.25, acadWeight);
      bookRig.leftHalf.rotation.y = bookOpen;
      bookRig.rightHalf.rotation.y = -bookOpen;

      // 5. Sports Trophy & Ball (prominent in Sports 04)
      const sportsWeight = Math.sin(Math.min(Math.max(s.sportsProgress, 0), 1) * Math.PI);
      sportsRig.group.position.set(
        THREE.MathUtils.lerp(5.8, 3.5, sportsWeight) * mobileFactor,
        THREE.MathUtils.lerp(-2.5, 0.2, sportsWeight),
        0.35
      );
      sportsRig.group.scale.setScalar((0.2 + sportsWeight * 0.75) * mobileFactor);
      sportsRig.group.rotation.y = s.sportsProgress * Math.PI * 1.4;
      sportsRig.ball.rotation.x = s.sportsProgress * Math.PI * 4;
      sportsRig.ball.rotation.z = s.sportsProgress * Math.PI * 3;

      // 6. Small Student Cartoon Mascot (Creative Corner 05 -> Announcements 07)
      const mascotWeight = Math.sin(
        Math.min(Math.max((s.creativeProgress + s.announcementsProgress) * 0.65, 0), 1) * Math.PI
      );
      studentMascot.position.set(
        THREE.MathUtils.lerp(-5.6, -3.5, mascotWeight) * mobileFactor,
        THREE.MathUtils.lerp(-2.8, -0.9, mascotWeight) + (reducedMotion ? 0 : Math.sin(t * 2.2) * 0.08),
        0.5
      );
      studentMascot.scale.setScalar((0.25 + mascotWeight * 0.85) * mobileFactor);
      studentMascot.rotation.y = 0.42 + Math.sin(s.globalProgress * 10) * 0.2;

      // 7. Floating Stars
      stars.forEach((star, i) => {
        const angle = s.globalProgress * Math.PI * 2 + i * 1.55;
        star.position.set(
          Math.cos(angle) * (isMobile ? 2.4 : 4.8),
          Math.sin(angle * 1.3) * 2.3,
          -0.6 + (i % 2) * 0.4
        );
        star.rotation.z = s.globalProgress * Math.PI * 3 + i;
        star.rotation.y = t * 0.7 + i;
        star.scale.setScalar((0.65 + Math.sin(s.globalProgress * Math.PI + i) * 0.25) * mobileFactor);
      });

      renderer?.render(scene, camera);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      if (renderer) {
        renderer.dispose();
        if (renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
      }
    };
  }, [scrollStateRef, reducedMotion, isMobile]);

  return <div ref={mountRef} className={className} aria-hidden="true" />;
}
