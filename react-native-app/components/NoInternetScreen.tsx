import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

const NoInternetScreen = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Animations
  const floatAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const waveAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Floating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -10,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Wave animation
    Animated.loop(
      Animated.timing(waveAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const waveScale = waveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.8],
  });

  const waveOpacity = waveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 0],
  });

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? '#000000' : '#f8fafc' },
      ]}
    >
      {/* Background gradient circles */}
      <View
        style={[
          styles.bgCircle1,
          { backgroundColor: isDark ? '#1e1b4b' : '#dbeafe' },
        ]}
      />
      <View
        style={[
          styles.bgCircle2,
          { backgroundColor: isDark ? '#1e293b' : '#e0e7ff' },
        ]}
      />

      <View style={styles.content}>
        {/* WiFi Off Icon Container */}
        <Animated.View
          style={[
            styles.iconWrapper,
            { transform: [{ translateY: floatAnim }] },
          ]}
        >
          {/* Wave rings */}
          <Animated.View
            style={[
              styles.waveRing,
              {
                transform: [{ scale: waveScale }],
                opacity: waveOpacity,
                backgroundColor: isDark
                  ? 'rgba(239, 68, 68, 0.2)'
                  : 'rgba(239, 68, 68, 0.3)',
              },
            ]}
          />

          {/* Icon background */}
          <Animated.View
            style={[
              styles.iconContainer,
              { transform: [{ scale: pulseAnim }] },
            ]}
          >
            <LinearGradient
              colors={
                isDark
                  ? ['#dc2626', '#991b1b']
                  : ['#ef4444', '#dc2626']
              }
              style={styles.iconGradient}
            >
              <Feather name="wifi-off" size={64} color="#ffffff" />
            </LinearGradient>
          </Animated.View>

          {/* Glow effect */}
          <View
            style={[
              styles.iconGlow,
              {
                backgroundColor: isDark
                  ? 'rgba(220, 38, 38, 0.3)'
                  : 'rgba(239, 68, 68, 0.2)',
              },
            ]}
          />
        </Animated.View>

        {/* Title */}
        <Text
          style={[
            styles.title,
            { color: isDark ? '#ffffff' : '#0f172a' },
          ]}
        >
          No Internet Connection
        </Text>

        {/* Subtitle */}
        <Text
          style={[
            styles.subtitle,
            { color: isDark ? '#94a3b8' : '#64748b' },
          ]}
        >
          Even the baby is crying because WiFi is gone.
        </Text>

        {/* Description */}
        <Text
          style={[
            styles.description,
            { color: isDark ? '#64748b' : '#94a3b8' },
          ]}
        >
          Please check your connection and try again.
        </Text>

        {/* Status cards */}
        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusCard,
              {
                backgroundColor: isDark
                  ? 'rgba(30, 27, 75, 0.5)'
                  : 'rgba(239, 246, 255, 0.8)',
                borderColor: isDark
                  ? 'rgba(99, 102, 241, 0.2)'
                  : 'rgba(99, 102, 241, 0.3)',
              },
            ]}
          >
            <View
              style={[
                styles.statusIconContainer,
                {
                  backgroundColor: isDark
                    ? 'rgba(99, 102, 241, 0.2)'
                    : '#ffffff',
                },
              ]}
            >
              <Feather
                name="wifi"
                size={20}
                color={isDark ? '#818cf8' : '#6366f1'}
              />
            </View>
            <View style={styles.statusTextContainer}>
              <Text
                style={[
                  styles.statusLabel,
                  { color: isDark ? '#94a3b8' : '#64748b' },
                ]}
              >
                WiFi Status
              </Text>
              <Text
                style={[
                  styles.statusValue,
                  { color: '#ef4444' },
                ]}
              >
                Disconnected
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.statusCard,
              {
                backgroundColor: isDark
                  ? 'rgba(30, 41, 59, 0.5)'
                  : 'rgba(249, 250, 251, 0.8)',
                borderColor: isDark
                  ? 'rgba(148, 163, 184, 0.2)'
                  : 'rgba(148, 163, 184, 0.3)',
              },
            ]}
          >
            <View
              style={[
                styles.statusIconContainer,
                {
                  backgroundColor: isDark
                    ? 'rgba(148, 163, 184, 0.2)'
                    : '#ffffff',
                },
              ]}
            >
              <Feather
                name="activity"
                size={20}
                color={isDark ? '#94a3b8' : '#64748b'}
              />
            </View>
            <View style={styles.statusTextContainer}>
              <Text
                style={[
                  styles.statusLabel,
                  { color: isDark ? '#94a3b8' : '#64748b' },
                ]}
              >
                Network
              </Text>
              <Text
                style={[
                  styles.statusValue,
                  { color: isDark ? '#cbd5e1' : '#0f172a' },
                ]}
              >
                Offline
              </Text>
            </View>
          </View>
        </View>

        {/* Retry Button */}
        <TouchableOpacity
          style={styles.retryButton}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#6366f1', '#4f46e5']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.retryGradient}
          >
            <Feather name="refresh-cw" size={20} color="#ffffff" />
            <Text style={styles.retryText}>Try Again</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Help text */}
        <TouchableOpacity activeOpacity={0.7}>
          <Text
            style={[
              styles.helpText,
              { color: isDark ? '#64748b' : '#94a3b8' },
            ]}
          >
            Need help? Check your settings →
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgCircle1: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    opacity: 0.3,
    top: -100,
    right: -50,
  },
  bgCircle2: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    opacity: 0.3,
    bottom: -80,
    left: -60,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  iconWrapper: {
    position: 'relative',
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  waveRing: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
  },
  iconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    overflow: 'hidden',
    zIndex: 2,
  },
  iconGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconGlow: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    zIndex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 24,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 32,
  },
  statusContainer: {
    width: '100%',
    maxWidth: 400,
    gap: 12,
    marginBottom: 32,
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  statusIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statusTextContainer: {
    flex: 1,
  },
  statusLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  statusValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  retryButton: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  retryGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  retryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  helpText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default NoInternetScreen;