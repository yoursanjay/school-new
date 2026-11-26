"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export interface TransportScrollState {
  globalProgress: number;
  heroProgress: number;
  safetyProgress: number;
  smartProgress: number;
  teamProgress: number;
  comfortProgress: number;
  routesProgress: number;
  ctaProgress: number;
}

interface Transport3DStageProps {
  scrollStateRef: React.MutableRefObject<TransportScrollState>;
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
  const dark = matte(0x161c19, 0.2);

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

/** Friendly Animated School Bus Character */
function buildSchoolBusCharacter() {
  const root = new THREE.Group();
  const yellow = new THREE.MeshPhysicalMaterial({
    color: 0xf6c324,
    roughness: 0.32,
    metalness: 0.14,
    clearcoat: 0.35,
  });
  const greenStripe = matte(0x1e7e48, 0.4);
  const glass = new THREE.MeshStandardMaterial({
    color: 0x1a2c24,
    roughness: 0.15,
    metalness: 0.4,
  });
  const tireMat = matte(0x1e2422, 0.8);
  const rimMat = matte(0xdbe8df, 0.3, 0.75);

  const chassis = new THREE.Mesh(new THREE.BoxGeometry(2.5, 1.12, 1.18), yellow);
  chassis.position.y = 0.25;
  chassis.castShadow = true;
  root.add(chassis);

  const hood = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.72, 1.08), yellow);
  hood.position.set(1.42, 0.06, 0);
  hood.castShadow = true;
  root.add(hood);

  // Leaf green school stripe
  const stripe = new THREE.Mesh(new THREE.BoxGeometry(2.54, 0.16, 1.2), greenStripe);
  stripe.position.y = 0.08;
  root.add(stripe);

  // Front windshield + friendly eyes
  const windshield = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.46, 0.94), glass);
  windshield.position.set(1.24, 0.56, 0);
  windshield.rotation.z = 0.12;
  root.add(windshield);

  const eyes = buildEyes(0.95);
  eyes.rotation.y = Math.PI / 2;
  eyes.position.set(1.3, 0.54, 0);
  root.add(eyes);

  // Side windows
  for (let i = -2; i <= 2; i++) {
    const win = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.38, 1.2), glass);
    win.position.set(i * 0.44, 0.48, 0);
    root.add(win);
  }

  // Smiling bumper
  const bumper = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.16, 1.14), rimMat);
  bumper.position.set(1.74, -0.22, 0);
  root.add(bumper);

  // Wheels
  const wheels: THREE.Group[] = [];
  const wheelCoords: [number, number][] = [
    [-0.78, 0.62],
    [-0.78, -0.62],
    [0.95, 0.62],
    [0.95, -0.62],
  ];
  wheelCoords.forEach(([x, z]) => {
    const w = new THREE.Group();
    const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.2, 20), tireMat);
    tire.rotation.x = Math.PI / 2;
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.22, 16), rimMat);
    hub.rotation.x = Math.PI / 2;
    w.add(tire, hub);
    w.position.set(x, -0.32, z);
    root.add(w);
    wheels.push(w);
  });

  // Roof beacon
  const beacon = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.11, 0.12, 14), matte(0x28a75b, 0.3));
  beacon.position.set(0.75, 0.88, 0);
  root.add(beacon);

  return { root, wheels };
}

/** Well-proportioned Student Character with Backpack */
function buildStudentCharacter(shirtColor = 0x1e7e48, packColor = 0xf6c324) {
  const g = new THREE.Group();
  const skin = matte(0xf2bf96, 0.55);
  const shirt = matte(shirtColor, 0.5);
  const pants = matte(0x1f2b26, 0.6);
  const pack = matte(packColor, 0.45);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.24, 18, 18), skin);
  head.position.y = 0.62;
  g.add(head);

  const hair = new THREE.Mesh(
    new THREE.SphereGeometry(0.25, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.55),
    matte(0x1e1d1b, 0.7)
  );
  hair.position.y = 0.66;
  g.add(hair);

  const eyes = buildEyes(0.55);
  eyes.position.set(0, 0.61, 0.22);
  g.add(eyes);

  const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.54, 14), shirt);
  torso.position.y = 0.14;
  g.add(torso);

  // Backpack
  const backpack = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.38, 0.18), pack);
  backpack.position.set(0, 0.18, -0.22);
  g.add(backpack);

  // Legs
  [-0.09, 0.09].forEach((x) => {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.065, 0.42, 12), pants);
    leg.position.set(x, -0.32, 0);
    g.add(leg);
  });

  // Waving arm
  const rightArm = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.045, 0.38, 10), shirt);
  rightArm.position.set(0.26, 0.28, 0.04);
  rightArm.rotation.z = -0.75;
  g.add(rightArm);

  return { group: g, rightArm };
}

/** 3D Green Safety Shield */
function buildSafetyShield() {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0.75);
  shape.lineTo(0.58, 0.52);
  shape.quadraticCurveTo(0.56, -0.2, 0, -0.78);
  shape.quadraticCurveTo(-0.56, -0.2, -0.58, 0.52);
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.16,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.04,
    bevelSegments: 3,
  });
  geo.center();

  const group = new THREE.Group();
  const shieldMesh = new THREE.Mesh(geo, matte(0x28a75b, 0.3, 0.2));
  group.add(shieldMesh);

  // Inner white checkmark/ring accent
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.045, 10, 24), matte(0xffffff, 0.25));
  ring.position.z = 0.12;
  group.add(ring);

  return group;
}

/** Animated Traffic Light & Road Sign */
function buildTrafficLight() {
  const g = new THREE.Group();
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.07, 1.8, 12), matte(0x27302c, 0.5));
  pole.position.y = -0.3;
  g.add(pole);

  const housing = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.88, 0.28), matte(0x1a211e, 0.45));
  housing.position.y = 0.65;
  g.add(housing);

  const lights: [number, number][] = [
    [0.9, 0xef4444],
    [0.65, 0xf6c324],
    [0.4, 0x28a75b],
  ];
  lights.forEach(([y, color]) => {
    const lens = new THREE.Mesh(
      new THREE.SphereGeometry(0.09, 14, 14),
      new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.45,
        roughness: 0.2,
      })
    );
    lens.position.set(0, y, 0.13);
    g.add(lens);
  });

  return g;
}

/** Rotating Globe + Location Pins */
function buildTransportGlobe() {
  const g = new THREE.Group();
  const sphere = new THREE.Group();

  const ocean = new THREE.Mesh(new THREE.SphereGeometry(0.75, 24, 24), matte(0x134e38, 0.35, 0.1));
  sphere.add(ocean);

  const landMat = matte(0xc9f0d8, 0.48);
  const patches: [number, number, number, number][] = [
    [0.46, 0.32, 0.48, 0.25],
    [-0.5, 0.22, 0.42, 0.24],
    [0.18, -0.38, 0.56, 0.22],
    [-0.3, -0.2, -0.6, 0.24],
  ];
  patches.forEach(([x, y, z, r]) => {
    const p = new THREE.Mesh(new THREE.SphereGeometry(r, 12, 12), landMat);
    p.position.set(x, y, z);
    p.scale.set(1.2, 0.85, 0.6);
    sphere.add(p);
  });

  // Yellow location pins
  [
    [0.42, 0.56, 0.42],
    [-0.48, 0.45, 0.45],
    [0.12, -0.52, 0.58],
  ].forEach(([x, y, z]) => {
    const pin = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 12), matte(0xf6c324, 0.25));
    pin.position.set(x, y, z);
    sphere.add(pin);
  });

  g.add(sphere);

  const orbitRing = new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.025, 10, 40), matte(0x28a75b, 0.3));
  orbitRing.rotation.x = 1.15;
  g.add(orbitRing);

  return { group: g, sphere };
}

/** Floating School Bag */
function buildSchoolBag() {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.82, 0.38), matte(0x1e7e48, 0.45));
  const pocket = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.36, 0.14), matte(0xf6c324, 0.4));
  pocket.position.set(0, -0.14, 0.22);
  const strap = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.04, 8, 18, Math.PI), matte(0x1a211e, 0.5));
  strap.position.set(0, 0.41, 0);
  g.add(body, pocket, strap);
  return g;
}

export default function Transport3DStage({
  scrollStateRef,
  reducedMotion,
  isMobile,
  className = "",
}: Transport3DStageProps) {
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
    renderer.toneMappingExposure = 1.08;
    renderer.shadowMap.enabled = !isMobile;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      isMobile ? 48 : 38,
      container.clientWidth / Math.max(container.clientHeight, 1),
      0.1,
      60
    );
    camera.position.set(0, 0, 12);

    scene.add(new THREE.HemisphereLight(0xf2fbf5, 0x0a261b, 1.2));
    const key = new THREE.DirectionalLight(0xfff8e6, 2.0);
    key.position.set(6, 9, 8);
    scene.add(key);

    const rim = new THREE.DirectionalLight(0x8be2af, 1.0);
    rim.position.set(-6, -3, 5);
    scene.add(rim);

    const bus = buildSchoolBusCharacter();
    scene.add(bus.root);

    const student = buildStudentCharacter();
    scene.add(student.group);

    const shield = buildSafetyShield();
    scene.add(shield);

    const trafficLight = buildTrafficLight();
    scene.add(trafficLight);

    const globe = buildTransportGlobe();
    scene.add(globe.group);

    const bag = buildSchoolBag();
    scene.add(bag);

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

      // 1. School Bus drives across Hero -> Routes -> Finale
      const busX = THREE.MathUtils.lerp(-4.2, 4.4, s.heroProgress) * m;
      const busScale = THREE.MathUtils.lerp(1.18, 0.72, s.heroProgress) * m;
      bus.root.position.set(
        s.routesProgress > 0.05
          ? THREE.MathUtils.lerp(-4.0, 4.0, s.routesProgress) * m
          : busX,
        s.routesProgress > 0.05
          ? Math.sin(s.routesProgress * Math.PI * 2) * 0.65 - 1.2
          : THREE.MathUtils.lerp(-1.6, 2.8, s.heroProgress),
        0.5
      );
      bus.root.scale.setScalar(
        s.routesProgress > 0.05 ? 0.82 * m : Math.max(0.28, busScale)
      );
      bus.root.rotation.set(0.08, -0.35 + Math.sin(s.globalProgress * 6) * 0.15, 0);
      bus.wheels.forEach((w) => {
        w.rotation.z = -s.globalProgress * Math.PI * 16;
      });

      // 2. Safety Shield (prominent in Section 02)
      const safetyW = Math.sin(Math.min(Math.max(s.safetyProgress, 0), 1) * Math.PI);
      shield.position.set(
        THREE.MathUtils.lerp(5.8, 3.6, safetyW) * m,
        THREE.MathUtils.lerp(-2.4, 0.2, safetyW),
        0.4
      );
      shield.scale.setScalar((0.18 + safetyW * 0.85) * m);
      shield.rotation.y = s.safetyProgress * Math.PI * 2 + (reducedMotion ? 0 : Math.sin(t) * 0.12);

      // 3. Rotating Globe (prominent in Section 03 Smart Transport)
      const smartW = Math.sin(Math.min(Math.max(s.smartProgress, 0), 1) * Math.PI);
      globe.group.position.set(
        THREE.MathUtils.lerp(-5.8, -3.7, smartW) * m,
        THREE.MathUtils.lerp(2.4, 0.0, smartW),
        0.2
      );
      globe.group.scale.setScalar((0.2 + smartW * 0.82) * m);
      globe.sphere.rotation.y = s.globalProgress * Math.PI * 5 + t * 0.25;

      // 4. Student Character & Traffic Light (Team / Comfort)
      const teamW = Math.sin(Math.min(Math.max(s.teamProgress, 0), 1) * Math.PI);
      student.group.position.set(
        THREE.MathUtils.lerp(5.6, 3.7, teamW) * m,
        THREE.MathUtils.lerp(-2.6, -0.4, teamW),
        0.45
      );
      student.group.scale.setScalar((0.2 + teamW * 0.9) * m);
      student.group.rotation.y = -0.45;
      student.rightArm.rotation.z = -0.75 + Math.sin(t * 3.2) * 0.22;

      trafficLight.position.set(
        THREE.MathUtils.lerp(-5.6, -3.9, safetyW + teamW * 0.4) * m,
        -1.2,
        -0.4
      );
      trafficLight.scale.setScalar((0.2 + Math.min(1, safetyW + teamW) * 0.62) * m);

      // 5. Floating School Bag (Hero & Comfort)
      const comfortW = Math.sin(Math.min(Math.max(s.comfortProgress, 0), 1) * Math.PI);
      bag.position.set(
        (isMobile ? 2.1 : 4.2) * Math.sin(s.globalProgress * Math.PI * 2),
        THREE.MathUtils.lerp(2.2, -1.5, s.globalProgress) + Math.sin(t * 1.5) * 0.1,
        -0.3
      );
      bag.scale.setScalar((0.55 + comfortW * 0.4) * m);
      bag.rotation.set(0.2, s.globalProgress * Math.PI * 3, 0.15);

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
