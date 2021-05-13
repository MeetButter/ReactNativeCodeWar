import { CHANNEL_NAME, TEMP_TOKEN_ID } from '@/constants/env';
import styles from '@/constants/styles/base';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View } from 'react-native';
import RtcEngine from 'react-native-agora';
import RemoteVideoPreview from '@/components/RemoteVideoPreview';
import getAgoraEngine from './utils/getAgoraEngine';
import HeartReactions from '@/components/HeartReactions';
import Button from '@/components/Button';
import { useRecoilState } from 'recoil';
import heartItems from '@/components/HeartReactions/_state/heartItems';
import addRandomHeart from '@/components/HeartReactions/_actions/addRandomHeart';

/**
 * TASK: Generate temporary token generated on Agora dashboard (valid for 24 hours)
 * or create a lambda / firebase function for generating Token via API call (optional)
 * @see https://docs.agora.io/en/Agora%20Platform/token#3-generate-a-token
 */
const App: React.FC = () => {
  const [, setHeartsCount] = useRecoilState(heartItems);
  const [token] = useState<string>(TEMP_TOKEN_ID);
  const [channelName] = useState<string>(CHANNEL_NAME); // Use this to generate token on Agora dashboard
  const [joinSucceed, setJoinSucceed] = useState<boolean>(false);
  const [peerIds, setPeerIds] = useState<number[]>([]);
  const AgoraEngine = useRef<RtcEngine>();

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

  const startCall = useCallback(
    function startCall() {
      AgoraEngine.current?.joinChannel(token, channelName, null, 0);
    },
    [token, channelName]
  );

  function addHeartReaction() {
    setHeartsCount(addRandomHeart());
  }

  return (
    <View style={styles.max}>
      <View style={styles.max}>
        <RemoteVideoPreview
          show={joinSucceed}
          channelName={channelName}
          peers={peerIds}
        >
          <HeartReactions />
        </RemoteVideoPreview>
        <View style={styles.buttonHolder}>
          <Button onPress={startCall}>Start Call</Button>
          <Button onPress={endCall}>End Call</Button>
          <Button onPress={addHeartReaction}>Like</Button>
        </View>
      </View>
    </View>
  );
};

export default App;
