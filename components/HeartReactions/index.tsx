import React from 'react';
import { useRecoilState } from 'recoil';
import heartItems from './_state/heartItems';
import removeHeartByID from './_actions/removeHeartByID';
import AnimatedHeart from './AnimatedHeart';

export default function HeartReactions() {
  const [hearts, setHearts] = useRecoilState(heartItems);
  const heartsRender = hearts.map(({ id }) => {
    return (
      <AnimatedHeart
        key={id}
        removeHeart={() => setHearts(removeHeartByID(id))}
        size={2}
      />
    );
  });
  return <>{heartsRender}</>;
}
