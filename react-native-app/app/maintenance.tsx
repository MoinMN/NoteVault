import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

export default function Maintenance() {
  const rotation = useRef(new Animated.Value(0)).current;
  const pulse1 = useRef(new Animated.Value(1)).current;
  const pulse2 = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Rotation animation
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();

    // Pulse animation 1
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse1, {
          toValue: 1.2,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulse1, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Pulse animation 2
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse2, {
          toValue: 1.3,
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.timing(pulse2, {
          toValue: 1,
          duration: 2500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const handleEmailPress = () => {
    Linking.openURL('mailto:support@example.com');
  };

  return (
    <LinearGradient
      colors={['#f8fafc', '#dbeafe', '#e0e7ff']}
      style={styles.container}
    >
      {/* Background decoration circles */}
      <Animated.View
        style={[
          styles.bgCircle1,
          { transform: [{ scale: pulse1 }] },
        ]}
      />
      <Animated.View
        style={[
          styles.bgCircle2,
          { transform: [{ scale: pulse2 }] },
        ]}
      />

      <View style={styles.content}>
        {/* Main Card */}
        <View style={styles.card}>
          {/* Animated Icon */}
          <View style={styles.iconContainer}>
            <View style={styles.iconGlow} />
            <Animated.View
              style={[
                styles.iconCircle,
                { transform: [{ rotate }] },
              ]}
            >
              <LinearGradient
                colors={['#6366f1', '#4f46e5']}
                style={styles.iconGradient}
              >
                <Feather name="settings" size={48} color="#ffffff" />
              </LinearGradient>
            </Animated.View>
          </View>

          {/* Title */}
          <Text style={styles.title}>{`We'll be back soon!`}</Text>

          {/* Description */}
          <Text style={styles.description}>
            Our servers are currently undergoing scheduled maintenance to bring
            you a better experience.
          </Text>

          {/* Info Cards */}
          <View style={styles.infoCardsContainer}>
            {/* Estimated Time Card */}
            <LinearGradient
              colors={['#eef2ff', '#dbeafe']}
              style={styles.infoCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View style={styles.infoIconContainer}>
                <Feather name="clock" size={24} color="#6366f1" />
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>ESTIMATED TIME</Text>
                <Text style={styles.infoValue}>1-2 hours</Text>
              </View>
            </LinearGradient>

            {/* Status Updates Card */}
            <LinearGradient
              colors={['#fdf2f8', '#fce7f3']}
              style={styles.infoCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View style={styles.infoIconContainer}>
                <Feather name="refresh-cw" size={24} color="#ec4899" />
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>STATUS UPDATES</Text>
                <Text style={styles.infoValue}>Every 30 minutes</Text>
              </View>
            </LinearGradient>
          </View>

          {/* Footer message */}
          <Text style={styles.footerMessage}>
            Thank you for your patience 💙
          </Text>

          {/* Contact Button */}
          <TouchableOpacity
            style={styles.contactButton}
            onPress={handleEmailPress}
            activeOpacity={0.7}
          >
            <Feather name="mail" size={16} color="#64748b" />
            <Text style={styles.contactText}>crichit45@gmail.com</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom text */}
        <Text style={styles.bottomText}>
          {`Need immediate help? We're here for you.`}
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgCircle1: {
    position: 'absolute',
    width: 384,
    height: 384,
    borderRadius: 192,
    backgroundColor: '#c7d2fe',
    opacity: 0.2,
    top: -100,
    right: -100,
  },
  bgCircle2: {
    position: 'absolute',
    width: 384,
    height: 384,
    borderRadius: 192,
    backgroundColor: '#fbcfe8',
    opacity: 0.2,
    bottom: -100,
    left: -100,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  card: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 32,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 30,
    elevation: 10,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconGlow: {
    position: 'absolute',
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#6366f1',
    opacity: 0.3,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    overflow: 'hidden',
  },
  iconGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#0f172a',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  infoCardsContainer: {
    width: '100%',
    gap: 12,
    marginBottom: 24,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.1)',
  },
  infoIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748b',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
  },
  footerMessage: {
    fontSize: 15,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 24,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#f1f5f9',
    borderRadius: 20,
    gap: 8,
  },
  contactText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  bottomText: {
    fontSize: 13,
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 24,
  },
});