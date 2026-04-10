import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { Colors } from '../theme/colors';

const GlassCard = ({ children, style }) => {
  return (
    <View style={[styles.container, style]}>
      <BlurView intensity={20} tint="dark" style={styles.blur}>
        <View style={styles.inner}>
          {children}
        </View>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.card,
  },
  blur: {
    padding: 20,
  },
  inner: {
    width: '100%',
  },
});

export default GlassCard;
