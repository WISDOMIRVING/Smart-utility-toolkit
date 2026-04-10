import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Accessibility } from 'lucide-react-native';
import { Colors, Gradients } from '../theme/colors';
import { LinearGradient } from 'expo-linear-gradient';
import GlassCard from '../components/GlassCard';

const BMICalculatorScreen = ({ navigation }) => {
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('175');
  const [gender, setGender] = useState('male'); // male, female

  const berat = parseFloat(weight);
  const tinggi = parseFloat(height) / 100; // convert cm to m
  const bmi = (berat && tinggi) ? (berat / (tinggi * tinggi)).toFixed(1) : '0.0';

  const getBMICategory = (val) => {
    const bmiVal = parseFloat(val);
    if (bmiVal < 18.5) return { label: 'Underweight', color: '#38bdf8' };
    if (bmiVal < 25) return { label: 'Normal', color: Colors.success };
    if (bmiVal < 30) return { label: 'Overweight', color: '#fbbf24' };
    return { label: 'Obese', color: Colors.error };
  };

  const category = getBMICategory(bmi);

  return (
    <View style={styles.container}>
      <LinearGradient colors={Gradients.dark} style={StyleSheet.absoluteFill} />
      
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <ChevronLeft color={Colors.text} size={28} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>BMI Calculator</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.genderContainer}>
            <TouchableOpacity 
              style={[styles.genderButton, gender === 'male' && styles.activeGenderMale]}
              onPress={() => setGender('male')}
            >
              <Text style={[styles.genderText, gender === 'male' && styles.activeGenderText]}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.genderButton, gender === 'female' && styles.activeGenderFemale]}
              onPress={() => setGender('female')}
            >
              <Text style={[styles.genderText, gender === 'female' && styles.activeGenderText]}>Female</Text>
            </TouchableOpacity>
          </View>

          <GlassCard style={styles.inputCard}>
             <View style={styles.inputRow}>
              <View style={styles.inputItem}>
                <Text style={styles.label}>Weight (kg)</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={weight}
                  onChangeText={setWeight}
                />
              </View>
              <View style={styles.dividerVertical} />
              <View style={styles.inputItem}>
                <Text style={styles.label}>Height (cm)</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={height}
                  onChangeText={setHeight}
                />
              </View>
            </View>
          </GlassCard>

          <View style={styles.resultSection}>
            <Text style={styles.resultLabel}>Your BMI is</Text>
            <View style={styles.bmiDisplay}>
               <LinearGradient
                colors={Gradients.accent}
                style={styles.bmiCircle}
              >
                <Text style={styles.bmiValue}>{bmi}</Text>
              </LinearGradient>
            </View>
            <Text style={[styles.categoryLabel, { color: category.color }]}>
              {category.label}
            </Text>
          </View>

          <GlassCard style={styles.infoCard}>
            <Text style={styles.infoTitle}>What does this mean?</Text>
            <Text style={styles.infoText}>
              Body Mass Index (BMI) is a measure of body fat based on height and weight that applies to adult men and women.
            </Text>
            <View style={styles.ranges}>
              <View style={styles.rangeItem}><View style={[styles.dot, { backgroundColor: '#38bdf8' }]} /><Text style={styles.rangeText}>Underweight: &lt; 18.5</Text></View>
              <View style={styles.rangeItem}><View style={[styles.dot, { backgroundColor: Colors.success }]} /><Text style={styles.rangeText}>Normal: 18.5 – 24.9</Text></View>
              <View style={styles.rangeItem}><View style={[styles.dot, { backgroundColor: '#fbbf24' }]} /><Text style={styles.rangeText}>Overweight: 25 – 29.9</Text></View>
              <View style={styles.rangeItem}><View style={[styles.dot, { backgroundColor: Colors.error }]} /><Text style={styles.rangeText}>Obese: &gt; 30</Text></View>
            </View>
          </GlassCard>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.text,
  },
  scrollContent: {
    padding: 20,
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  genderButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: Colors.card,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  activeGenderMale: {
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    borderColor: Colors.primary,
  },
  activeGenderFemale: {
    backgroundColor: 'rgba(244, 63, 94, 0.2)',
    borderColor: Colors.accent,
  },
  genderText: {
    color: Colors.textSecondary,
    fontWeight: '600',
    fontSize: 16,
  },
  activeGenderText: {
    color: Colors.text,
  },
  inputCard: {
    marginBottom: 24,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputItem: {
    flex: 1,
    alignItems: 'center',
  },
  dividerVertical: {
    width: 1,
    height: '60%',
    backgroundColor: Colors.border,
  },
  label: {
    color: Colors.textSecondary,
    fontSize: 14,
    marginBottom: 4,
  },
  input: {
    fontSize: 32,
    color: Colors.text,
    fontWeight: '700',
  },
  resultSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  resultLabel: {
    color: Colors.textSecondary,
    fontSize: 18,
    marginBottom: 16,
  },
  bmiDisplay: {
    width: 140,
    height: 140,
    borderRadius: 70,
    padding: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  bmiCircle: {
    width: '100%',
    height: '100%',
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  bmiValue: {
    fontSize: 48,
    fontWeight: '900',
    color: Colors.white,
  },
  categoryLabel: {
    fontSize: 24,
    fontWeight: '700',
  },
  infoCard: {
    padding: 0,
  },
  infoTitle: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  infoText: {
    color: Colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  ranges: {
    gap: 8,
  },
  rangeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  rangeText: {
    color: Colors.textSecondary,
    fontSize: 13,
  },
});

export default BMICalculatorScreen;
