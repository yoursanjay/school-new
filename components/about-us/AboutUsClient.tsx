"use client";

import React, { useState, useCallback } from "react";
import styles from "./AboutUsPage.module.css";
import {
  aboutBlock,
  aboutCondensed,
  aboutRounded,
  aboutScript,
} from "./typography";
import Section01LearningApproach from "./Section01LearningApproach";
import Section02AdventureBegins from "./Section02AdventureBegins";
import Section03LearningConnects from "./Section03LearningConnects";
import Section04WelcomeRocket from "./Section04WelcomeRocket";
import Section05WhatMakesSpecial, {
  type SpecialPillar,
} from "./Section05WhatMakesSpecial";

export default function AboutUsClient() {
  const [activePillarId, setActivePillarId] =
    useState<SpecialPillar["id"]>("holistic");

  const handleMeetTeachers = useCallback(() => {
    setActivePillarId("educators");
    const target = document.getElementById("what-makes-sam-special");
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 84;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  return (
    <div
      className={`${styles.aboutRoot} ${aboutRounded.variable} ${aboutBlock.variable} ${aboutCondensed.variable} ${aboutScript.variable}`}
    >
      <Section01LearningApproach />
      <Section02AdventureBegins />
      <Section03LearningConnects />
      <Section04WelcomeRocket onMeetTeachers={handleMeetTeachers} />
      <Section05WhatMakesSpecial
        activePillarId={activePillarId}
        onSelectPillar={setActivePillarId}
      />
    </div>
  );
}
