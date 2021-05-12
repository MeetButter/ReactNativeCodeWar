import styles from '@/constants/styles/base';
import React, { useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import {
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
} from 'react-native-agora';

export type Props = {
  channelName: string;
  /** Any component to be added on current view */
  children?: React.ReactNode;
  peers: Array<number>;
  /** If false component wont be rendered */
  show?: boolean;
};

export default function RemoteVideoPreview({
  channelName,
  children = null,
  peers = [],
  show = true,
}: Props) {
  const perPeerVideoRender = useMemo(() => {
    return (
      <ScrollView
        style={styles.remoteContainer}
        contentContainerStyle={{ paddingHorizontal: 2.5 }}
        horizontal={true}
      >
        {peers.map((value) => {
          return (
            <RtcRemoteView.SurfaceView
              style={styles.remote}
              uid={value}
              channelId={channelName}
              renderMode={VideoRenderMode.Hidden}
              zOrderMediaOverlay={true}
            />
          );
        })}
      </ScrollView>
    );
  }, [peers, channelName]);
  return show ? (
    <View style={styles.fullView}>
      <RtcLocalView.SurfaceView
        style={styles.max}
        channelId={channelName}
        renderMode={VideoRenderMode.Hidden}
      />
      {children}
      {perPeerVideoRender}
    </View>
  ) : null;
}
