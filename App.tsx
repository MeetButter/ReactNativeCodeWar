import { CHANNEL_NAME, TEMP_TOKEN_ID } from '@/constants/env';
import styles from '@/constants/styles/base';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View } from 'react-native';
import RtcEngine from 'react-native-agora';
import RemoteVideoPreview from '@/components/RemoteVideoPreview';
import getAgoraEngine from './utils/getAgoraEngine';
import HeartReaction from '@/components/HeartReaction';
import Button from '@/components/Button';

/**
 * TASK: Generate temporary token generated on Agora dashboard (valid for 24 hours)
 * or create a lambda / firebase function for generating Token via API call (optional)
 * @see https://docs.agora.io/en/Agora%20Platform/token#3-generate-a-token
 */

const App: React.FC = () => {
  const [token] = useState<string>(TEMP_TOKEN_ID);
  const [channelName] = useState<string>(CHANNEL_NAME); // Use this to generate token on Agora dashboard
  const [joinSucceed, setJoinSucceed] = useState<boolean>(false);
  const [peerIds, setPeerIds] = useState<number[]>([]);
  const AgoraEngine = useRef<RtcEngine>();
  /**
   * TASK: Add redux and migrate heart states to redux
   */
  const [hearts, setHearts] = useState<{ id: number }[]>([]);
  const [heartsElements, setHeartsElements] = useState<JSX.Element[]>([]);

  const endCall = useCallback(async function endCall() {
    if (AgoraEngine.current) await AgoraEngine.current.leaveChannel();
    setPeerIds([]);
    setJoinSucceed(false);
  }, []);

  useEffect(() => {
    getAgoraEngine({
      getPeers: () => peerIds,
      onPeer: setPeerIds,
      onJoin: setJoinSucceed,
    }).then((newEngine) => {
      AgoraEngine.current = newEngine;
    });
    return () => {
      endCall();
    };
  }, []);

  /**
   * TASK: Add redux middleware and handle this Side Effect in middleware
   * Bonus: use Debounce on showing the heart for enhanced performance
   */
  useEffect(() => {
    if (hearts.length > 0) {
      const heartElements = hearts.map((heart) => {
        return (
          <View style={styles.heartContainer} key={heart.id}>
            <HeartReaction color="red" size={2} />
          </View>
        );
      });
      setHeartsElements(heartElements);
      setTimeout(() => {
        setHearts([]);
      }, 2000);
    }
  }, [hearts]);

  const startCall = useCallback(
    function startCall() {
      AgoraEngine.current?.joinChannel(token, channelName, null, 0);
    },
    [token, channelName]
  );

  /**
   * TASK: Dispatch side effect to middleware for handling new heart added action
   */
  const addHeart = () => {
    setHearts([...hearts, { id: Math.round(Math.random() * 1000) }]);
  };

  return (
    <View style={styles.max}>
      <View style={styles.max}>
        <RemoteVideoPreview
          show={joinSucceed}
          channelName={channelName}
          peers={peerIds}
        >
          {heartsElements}
        </RemoteVideoPreview>
        <View style={styles.buttonHolder}>
          <Button onPress={startCall}>Start Call</Button>
          <Button onPress={endCall}>End Call</Button>
          <Button onPress={addHeart}>Like</Button>
        </View>
      </View>
    </View>
  );
};

export default App;
