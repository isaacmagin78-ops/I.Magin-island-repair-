import React from 'react';
import {AbsoluteFill} from 'remotion';
import {THEME} from '../config/theme';
import {AnimatedText} from '../components/AnimatedText';
import {ThoughtBubble} from '../components/ThoughtBubble';

/** Visual reference + test harness for the reusable text/bubble components. */
export const ComponentsDemo: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: THEME.bg}}>
      <ThoughtBubble text="Is that a treat?!" startFrame={10} top={160} />
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
        <AnimatedText text="Tyson's Big Day" startFrame={0} animation="pop" fontSize={72} color={THEME.accent} />
      </AbsoluteFill>
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 260}}>
        <AnimatedText text="Stay tuned..." startFrame={20} animation="slideUp" fontSize={48} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
