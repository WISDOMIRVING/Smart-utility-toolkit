# Smart Utility Toolkit (Stage 1)

A premium, all-in-one mobile utility application built with React Native and Expo. The app features a sleek dark mode design with glassmorphic elements and provides essential tools for daily tasks.

## 🚀 Features

### 1. Task Manager (New)
- **Persistent Storage**: Tasks are saved locally and persist even after the app is closed.
- **Full CRUD**: Create, Read, Update, and Delete tasks.
- **Checklist Logic**: Easily mark tasks as completed with a satisfying visual feedback.
- **Offline Mode**: Works entirely without an internet connection.

### 2. Unit Converter
- **Length**: Convert between Meters, Kilometers, Miles, Feet, and Inches.
- **Weight**: Convert between Kilograms, Grams, Pounds, and Ounces.
- **Temperature**: Accurate conversions between Celsius, Fahrenheit, and Kelvin.

### 3. Currency Converter
- **Real-time Rates**: Fetches the latest exchange rates using the Frankfurter API.
- **Multicurrency**: Supports USD, EUR, GBP, JPY, CAD, AUD, CNY, INR, and BRL.

### 4. BMI Calculator
- **Health Tracking**: Calculate your Body Mass Index (BMI) instantly.
- **Visual Feedback**: Dynamic color-coded results (Underweight, Normal, Overweight, Obese).
- **Gender Selection**: Tailored UI for Male and Female profiles.

## 🎨 Design & UX
- **Premium Aesthetics**: Dark theme using carefully curated HSL colors.
- **Glassmorphism**: Beautiful blurred backdrop effects using `expo-blur`.
- **Micro-animations**: Smooth transitions and interactive elements.
- **Responsiveness**: Fully optimized for various screen sizes and orientations.

## 🛠️ Technology Stack
- **Framework**: Expo / React Native
- **Navigation**: React Navigation (Native Stack)
- **Styling**: StyleSheet API with Linear Gradients
- **Icons**: Lucide React Native
- **Storage**: @react-native-async-storage/async-storage

## 🏃 Launching the App

### Prerequisites
- Node.js installed on your machine.
- Expo Go app on your phone (for testing).

### Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npx expo start
   ```

### Running on Device
- Scan the QR code with your Expo Go app (Android) or Camera app (iOS).

## 📄 Deliverables
- [x] Fully functional app with Task Manager
- [x] Persistent offline storage
- [x] Clean, consistent UI/UX
- [x] Updated README documentation
