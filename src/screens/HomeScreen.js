import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ruler, DollarSign, Activity, Settings, CheckSquare } from 'lucide-react-native';
import { Colors, Gradients } from '../theme/colors';
import GlassCard from '../components/GlassCard';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 60) / 2;

const HomeScreen = ({ navigation }) => {
  const modules = [
    {
      id: 'unit',
      title: 'Unit Converter',
      icon: Ruler,
      description: 'Length, Weight, Temp',
      colors: Gradients.primary,
      screen: 'UnitConverter',
    },
    {
      id: 'currency',
      title: 'Currency',
      icon: DollarSign,
      description: 'Real-time rates',
      colors: Gradients.secondary,
      screen: 'CurrencyConverter',
    },
    {
      id: 'bmi',
      title: 'BMI Calculator',
      icon: Activity,
      description: 'Health checking',
      colors: Gradients.accent,
      screen: 'BMICalculator',
    },
    {
      id: 'tasks',
      title: 'Task Manager',
      icon: CheckSquare,
      description: 'Checklist & Todo',
      colors: Gradients.primary,
      screen: 'TaskManager',
    },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient colors={Gradients.dark} style={StyleSheet.absoluteFill} />
      
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.greeting}>Smart Utility</Text>
            <Text style={styles.title}>Toolkit</Text>
          </View>

          <View style={styles.grid}>
            {modules.map((module) => (
              <TouchableOpacity
                key={module.id}
                style={styles.cardWrapper}
                onPress={() => navigation.navigate(module.screen)}
              >
                <GlassCard style={styles.card}>
                  <LinearGradient
                    colors={module.colors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.iconContainer}
                  >
                    <module.icon color={Colors.white} size={28} />
                  </LinearGradient>
                  
                  <Text style={styles.cardTitle}>{module.title}</Text>
                  <Text style={styles.cardDesc}>{module.description}</Text>
                </GlassCard>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 40,
    marginTop: 20,
  },
  greeting: {
    fontSize: 18,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  title: {
    fontSize: 42,
    color: Colors.text,
    fontWeight: '800',
    letterSpacing: -1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: COLUMN_WIDTH,
    marginBottom: 20,
  },
  card: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});

export default HomeScreen;
