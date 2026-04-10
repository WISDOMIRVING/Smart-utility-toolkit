import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, DollarSign, RefreshCw } from 'lucide-react-native';
import { Colors, Gradients } from '../theme/colors';
import { LinearGradient } from 'expo-linear-gradient';
import GlassCard from '../components/GlassCard';

const CurrencyConverterScreen = ({ navigation }) => {
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CNY', 'INR', 'BRL'];

  const fetchRates = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.frankfurter.app/latest?from=${fromCurrency}`);
      const data = await response.json();
      setRates(data.rates);
    } catch (err) {
      setError('Failed to fetch rates. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, [fromCurrency]);

  const convertedAmount = (rates[toCurrency] && amount) 
    ? (parseFloat(amount) * rates[toCurrency]).toFixed(2) 
    : '0.00';

  return (
    <View style={styles.container}>
      <LinearGradient colors={Gradients.dark} style={StyleSheet.absoluteFill} />
      
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <ChevronLeft color={Colors.text} size={28} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Currency</Text>
          <TouchableOpacity onPress={fetchRates} style={styles.refreshButton}>
            <RefreshCw color={Colors.text} size={20} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {loading ? (
            <ActivityIndicator size="large" color={Colors.primary} style={styles.loader} />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            <>
              <GlassCard style={styles.converterCard}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Amount ({fromCurrency})</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={amount}
                    onChangeText={setAmount}
                    placeholder="1.00"
                    placeholderTextColor={Colors.textSecondary}
                  />
                </View>

                <View style={styles.divider} />

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Result ({toCurrency})</Text>
                  <View style={styles.resultContainer}>
                    <Text style={styles.resultValue}>{convertedAmount}</Text>
                  </View>
                </View>
              </GlassCard>

              <View style={styles.selectionGrid}>
                <View style={styles.selectionColumn}>
                  <Text style={styles.selectionTitle}>From</Text>
                  {currencies.map((curr) => (
                    <TouchableOpacity
                      key={`from-${curr}`}
                      style={[styles.unitButton, fromCurrency === curr && styles.selectedUnit]}
                      onPress={() => setFromCurrency(curr)}
                    >
                      <Text style={[styles.unitButtonText, fromCurrency === curr && styles.selectedUnitText]}>
                        {curr}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                 <View style={styles.selectionColumn}>
                  <Text style={styles.selectionTitle}>To</Text>
                  {currencies.map((curr) => (
                    <TouchableOpacity
                      key={`to-${curr}`}
                      style={[styles.unitButton, toCurrency === curr && styles.selectedUnit]}
                      onPress={() => setToCurrency(curr)}
                    >
                      <Text style={[styles.unitButtonText, toCurrency === curr && styles.selectedUnitText]}>
                        {curr}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </>
          )}
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
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  refreshButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.text,
    flex: 1,
    textAlign: 'center',
  },
  scrollContent: {
    padding: 20,
  },
  loader: {
    marginTop: 40,
  },
  errorText: {
    color: Colors.error,
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
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
    color: Colors.secondary,
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
    borderColor: Colors.secondary,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
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

export default CurrencyConverterScreen;
