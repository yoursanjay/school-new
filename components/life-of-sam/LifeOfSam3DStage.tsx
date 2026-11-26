"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export interface LifeOfSamScrollState {
  globalProgress: number;
  morningProgress: number;
  classroomsProgress: number;
  friendshipsProgress: number;
  beyondProgress: number;
  talentProgress: number;
  momentsProgress: number;
  finaleProgress: number;
}

interface LifeOfSam3DStageProps {
  scrollStateRef: React.MutableRefObject<LifeOfSamScrollState>;
  reducedMotion: boolean;
  isMobile: boolean;
  className?: string;
}

function matte(color: number, roughness = 0.45, metalness = 0.08) {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness });
}

function buildEyes(scale = 1) {
  const g = new THREE.Group();
  const white = matte(0xffffff, 0.25);
  const dark = matte(0x0b162c, 0.2);

  [-0.12 * scale, 0.12 * scale].forEach((x) => {
    const e = new THREE.Mesh(new THREE.SphereGeometry(0.095 * scale, 14, 14), white);
    e.scale.set(1, 1.2, 0.7);
    e.position.set(x, 0, 0);
    const p = new THREE.Mesh(new THREE.SphereGeometry(0.05 * scale, 12, 12), dark);
    p.position.set(0, -0.01 * scale, 0.06 * scale);
    e.add(p);
    g.add(e);
  });
  return g;
}

/** Walking 3D Student Character (animated legs & arms driven by scroll) */
function buildWalkingStudent() {
  const root = new THREE.Group();
  const skin = matte(0xf2bf96, 0.54);
  const shirt = matte(0xfaf7f0, 0.52);
  const blazer = matte(0x162b4d, 0.48);
  const pack = matte(0xf4843f, 0.44);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.27, 20, 20), skin);
  head.position.y = 0.72;
  root.add(head);

  const hair = new THREE.Mesh(
    new THREE.SphereGeometry(0.28, 18, 14, 0, Math.PI * 2, 0, Math.PI * 0.54),
    matte(0x1b1a1d, 0.72)
  );
  hair.position.y = 0.76;
  root.add(hair);

  const eyes = buildEyes(0.64);
  eyes.position.set(0, 0.71, 0.24);
  root.add(eyes);

  const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.23, 0.56, 16), blazer);
  torso.position.y = 0.2;
  root.add(torso);

  const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 0.12, 14), shirt);
  collar.position.y = 0.46;
  root.add(collar);

  const backpack = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.4, 0.19), pack);
  backpack.position.set(0, 0.22, -0.22);
  root.add(backpack);

  // Articulated legs for walking cycle
  const leftLegPivot = new THREE.Group();
  leftLegPivot.position.set(-0.09, -0.08, 0);
  const leftLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.065, 0.46, 12), blazer);
  leftLeg.position.y = -0.23;
  leftLegPivot.add(leftLeg);

  const rightLegPivot = new THREE.Group();
  rightLegPivot.position.set(0.09, -0.08, 0);
  const rightLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.065, 0.46, 12), blazer);
  rightLeg.position.y = -0.23;
  rightLegPivot.add(rightLeg);

  // Articulated arms
  const leftArmPivot = new THREE.Group();
  leftArmPivot.position.set(-0.26, 0.4, 0);
  const leftArm = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.05, 0.4, 10), blazer);
  leftArm.position.y = -0.18;
  leftArmPivot.add(leftArm);

  const rightArmPivot = new THREE.Group();
  rightArmPivot.position.set(0.26, 0.4, 0);
  const rightArm = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.05, 0.4, 10), blazer);
  rightArm.position.y = -0.18;
  rightArmPivot.add(rightArm);

  root.add(leftLegPivot, rightLegPivot, leftArmPivot, rightArmPivot);
  return { root, leftLegPivot, rightLegPivot, leftArmPivot, rightArmPivot };
}

/** Morning School Bus */
function buildMorningBus() {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.96, 1.05), matte(0xf6c324, 0.35, 0.12));
  body.position.y = 0.22;
  const stripe = new THREE.Mesh(new THREE.BoxGeometry(2.24, 0.14, 1.07), matte(0x0b162c, 0.45));
  stripe.position.y = 0.1;
  const glass = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.34, 1.07), matte(0x183052, 0.2, 0.4));
  glass.position.y = 0.44;
  g.add(body, stripe, glass);

  [
    [-0.7, 0.54],
    [-0.7, -0.54],
    [0.7, 0.54],
    [0.7, -0.54],
  ].forEach(([x, z]) => {
    const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.16, 16), matte(0x161b24, 0.8));
    tire.rotation.x = Math.PI / 2;
    tire.position.set(x, -0.26, z);
    g.add(tire);
  });

  return g;
}

/** Opening Book (Section 02 Classrooms) */
function buildOpeningBook() {
  const root = new THREE.Group();
  const cover = matte(0x6ec1e4, 0.4);
  const page = matte(0xfaf7f0, 0.78);

  const left = new THREE.Group();
  const lc = new THREE.Mesh(new THREE.BoxGeometry(0.76, 1.06, 0.08), cover);
  lc.position.set(-0.38, 0, 0);
  const lp = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.98, 0.09), page);
  lp.position.set(-0.36, 0, 0.05);
  left.add(lc, lp);

  const right = new THREE.Group();
  const rc = new THREE.Mesh(new THREE.BoxGeometry(0.76, 1.06, 0.08), cover);
  rc.position.set(0.38, 0, 0);
  const rp = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.98, 0.09), page);
  rp.position.set(0.36, 0, 0.05);
  right.add(rc, rp);

  root.add(left, right);
  return { root, left, right };
}

/** Sports Ball & Mint Ring (Section 04 Beyond the Classroom) */
function buildSportsObject() {
  const g = new THREE.Group();
  const ball = new THREE.Mesh(new THREE.IcosahedronGeometry(0.45, 1), matte(0xf4843f, 0.42));
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.72, 0.04, 12, 32), matte(0x7ee0b5, 0.35));
  ring.rotation.x = 1.1;
  g.add(ball, ring);
  return { g, ball };
}

/** Talent Globe & Star (Section 05 Discover Your Talent) */
function buildTalentGlobe() {
  const g = new THREE.Group();
  const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.6, 22, 22), matte(0x6ec1e4, 0.36));
  const orbit = new THREE.Mesh(new THREE.TorusGeometry(0.84, 0.03, 10, 36), matte(0xf4843f, 0.35));
  orbit.rotation.y = 0.6;
  g.add(sphere, orbit);
  return g;
}

export default function LifeOfSam3DStage({
  scrollStateRef,
  reducedMotion,
  isMobile,
  className = "",
}: LifeOfSam3DStageProps) {
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

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.06;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      isMobile ? 48 : 38,
      container.clientWidth / Math.max(container.clientHeight, 1),
      0.1,
      60
    );
    camera.position.set(0, 0, 12);

    scene.add(new THREE.HemisphereLight(0xfaf7f0, 0x0b162c, 1.15));
    const sunKey = new THREE.DirectionalLight(0xffe9cc, 1.9);
    sunKey.position.set(7, 9, 8);
    scene.add(sunKey);

    const skyRim = new THREE.DirectionalLight(0x6ec1e4, 0.95);
    skyRim.position.set(-7, -2, 5);
    scene.add(skyRim);

    const walker = buildWalkingStudent();
    scene.add(walker.root);

    const bus = buildMorningBus();
    scene.add(bus);

    const book = buildOpeningBook();
    scene.add(book.root);

    const sports = buildSportsObject();
    scene.add(sports.g);

    const talent = buildTalentGlobe();
    scene.add(talent);

    const onResize = () => {
      if (!container || !renderer) return;
      camera.aspect = container.clientWidth / Math.max(container.clientHeight, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    let rafId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      rafId = window.requestAnimationFrame(animate);
      const t = reducedMotion ? 0 : clock.getElapsedTime();
      const s = scrollStateRef.current;
      const m = isMobile ? 0.65 : 1;

      // Walking Student travels smoothly across the day (left-to-right-to-left)
      const stride = s.globalProgress * Math.PI * 14;
      walker.leftLegPivot.rotation.x = Math.sin(stride) * 0.52;
      walker.rightLegPivot.rotation.x = -Math.sin(stride) * 0.52;
      walker.leftArmPivot.rotation.x = -Math.sin(stride) * 0.42;
      walker.rightArmPivot.rotation.x = Math.sin(stride) * 0.42;

      walker.root.position.set(
        Math.sin(s.globalProgress * Math.PI * 2) * (isMobile ? 2.0 : 4.1),
        -1.35 + Math.abs(Math.sin(stride)) * 0.09,
        0.55
      );
      walker.root.scale.setScalar(THREE.MathUtils.lerp(1.08, 0.84, s.globalProgress) * m);
      walker.root.rotation.y = Math.cos(s.globalProgress * Math.PI * 2) > 0 ? 0.45 : -0.45;

      // Morning Bus (Section 01 arrival)
      const busW = Math.max(0, 1 - s.morningProgress * 1.15);
      bus.position.set(THREE.MathUtils.lerp(4.6, -4.4, s.morningProgress) * m, -1.7, -0.3);
      bus.scale.setScalar((0.2 + busW * 0.78) * m);
      bus.rotation.y = -0.35;

      // Opening Book (Section 02 Classrooms)
      const bookW = Math.sin(Math.min(Math.max(s.classroomsProgress, 0), 1) * Math.PI);
      book.root.position.set(THREE.MathUtils.lerp(-5.8, -3.7, bookW) * m, 0.35, 0.2);
      book.root.scale.setScalar((0.2 + bookW * 0.78) * m);
      const openA = THREE.MathUtils.lerp(1.25, 0.24, bookW);
      book.left.rotation.y = openA;
      book.right.rotation.y = -openA;

      // Sports Object (Section 04 Beyond the Classroom)
      const sportsW = Math.sin(Math.min(Math.max(s.beyondProgress, 0), 1) * Math.PI);
      sports.g.position.set(THREE.MathUtils.lerp(5.8, 3.8, sportsW) * m, 0.2, 0.2);
      sports.g.scale.setScalar((0.18 + sportsW * 0.78) * m);
      sports.g.rotation.y = s.beyondProgress * Math.PI * 2 + t * 0.2;
      sports.ball.rotation.x = s.beyondProgress * Math.PI * 5;

      // Talent Globe (Section 05 Discover Your Talent)
      const talentW = Math.sin(Math.min(Math.max(s.talentProgress, 0), 1) * Math.PI);
      talent.position.set(THREE.MathUtils.lerp(-5.6, -3.8, talentW) * m, 0.1, 0.1);
      talent.scale.setScalar((0.18 + talentW * 0.78) * m);
      talent.rotation.y = s.talentProgress * Math.PI * 3 + t * 0.25;

      renderer?.render(scene, camera);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) obj.material.forEach((mItem) => mItem.dispose());
          else obj.material.dispose();
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
