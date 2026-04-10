import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Scale, Ruler, Thermometer } from 'lucide-react-native';
import { Colors, Gradients } from '../theme/colors';
import { LinearGradient } from 'expo-linear-gradient';
import GlassCard from '../components/GlassCard';
import { convertUnits, unitConversions } from '../utils/conversionLogic';

const categories = [
  { id: 'length', name: 'Length', icon: Ruler },
  { id: 'weight', name: 'Weight', icon: Scale },
  { id: 'temp', name: 'Temp', icon: Thermometer },
];

const UnitConverterScreen = ({ navigation }) => {
  const [category, setCategory] = useState('length');
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('meters');
  const [toUnit, setToUnit] = useState('kilometers');

  const units = category === 'temp' 
    ? ['Celsius', 'Fahrenheit', 'Kelvin'] 
    : unitConversions[category].units;

  const result = value ? convertUnits(parseFloat(value), fromUnit, toUnit, category).toFixed(4) : '0';

  return (
    <View style={styles.container}>
      <LinearGradient colors={Gradients.dark} style={StyleSheet.absoluteFill} />
      
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <ChevronLeft color={Colors.text} size={28} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Unit Converter</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.categoryContainer}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[styles.categoryTab, category === cat.id && styles.activeTab]}
                onPress={() => {
                  setCategory(cat.id);
                  const newUnits = cat.id === 'temp' ? ['Celsius', 'Fahrenheit', 'Kelvin'] : unitConversions[cat.id].units;
                  setFromUnit(newUnits[0]);
                  setToUnit(newUnits[1]);
                }}
              >
                <cat.icon color={category === cat.id ? Colors.white : Colors.textSecondary} size={20} />
                <Text style={[styles.categoryText, category === cat.id && styles.activeTabText]}>
                  {cat.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <GlassCard style={styles.converterCard}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>From ({fromUnit})</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={value}
                onChangeText={setValue}
                placeholder="Enter value"
                placeholderTextColor={Colors.textSecondary}
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.inputGroup}>
              <Text style={styles.label}>To ({toUnit})</Text>
              <View style={styles.resultContainer}>
                <Text style={styles.resultValue}>{result}</Text>
              </View>
            </View>
          </GlassCard>

          <View style={styles.selectionGrid}>
            <View style={styles.selectionColumn}>
              <Text style={styles.selectionTitle}>From</Text>
              {units.map((unit) => (
                <TouchableOpacity
                  key={`from-${unit}`}
                  style={[styles.unitButton, fromUnit === unit && styles.selectedUnit]}
                  onPress={() => setFromUnit(unit)}
                >
                  <Text style={[styles.unitButtonText, fromUnit === unit && styles.selectedUnitText]}>
                    {unit}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
             <View style={styles.selectionColumn}>
              <Text style={styles.selectionTitle}>To</Text>
              {units.map((unit) => (
                <TouchableOpacity
                  key={`to-${unit}`}
                  style={[styles.unitButton, toUnit === unit && styles.selectedUnit]}
                  onPress={() => setToUnit(unit)}
                >
                  <Text style={[styles.unitButtonText, toUnit === unit && styles.selectedUnitText]}>
                    {unit}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
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
  categoryContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 4,
  },
  categoryTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  activeTab: {
    backgroundColor: Colors.primary,
  },
  categoryText: {
    color: Colors.textSecondary,
    fontWeight: '600',
    fontSize: 14,
  },
  activeTabText: {
    color: Colors.white,
  },
  converterCard: {
    marginBottom: 24,
  },
  inputGroup: {
    paddingVertical: 8,
  },
  label: {
    color: Colors.textSecondary,
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    fontSize: 32,
    color: Colors.white,
    fontWeight: '700',
    padding: 0,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 16,
  },
  resultContainer: {
    minHeight: 40,
    justifyContent: 'center',
  },
  resultValue: {
    fontSize: 32,
    color: Colors.primary,
    fontWeight: '700',
  },
  selectionGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  selectionColumn: {
    flex: 1,
  },
  selectionTitle: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  unitButton: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: Colors.card,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedUnit: {
    borderColor: Colors.primary,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
  },
  unitButtonText: {
    color: Colors.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  },
  selectedUnitText: {
    color: Colors.text,
    fontWeight: '700',
  },
});

export default UnitConverterScreen;
