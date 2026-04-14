import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Plus, Trash2, CheckCircle2, Circle, Edit2, X } from 'lucide-react-native';
import { Colors, Gradients } from '../theme/colors';
import { LinearGradient } from 'expo-linear-gradient';
import GlassCard from '../components/GlassCard';
import { getTasks, saveTasks, addTask, updateTask, deleteTask } from '../utils/storage';

const TaskManagerScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const loadedTasks = await getTasks();
    setTasks(loadedTasks);
  };

  const handleAddOrUpdate = async () => {
    if (taskInput.trim() === '') return;

    if (editingId) {
      const updated = await updateTask(editingId, { text: taskInput });
      setTasks(updated);
      setEditingId(null);
    } else {
      const updated = await addTask(taskInput);
      setTasks(updated);
    }
    setTaskInput('');
  };

  const handleToggleComplete = async (id, currentStatus) => {
    const updated = await updateTask(id, { completed: !currentStatus });
    setTasks(updated);
  };

  const handleDelete = (id) => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const updated = await deleteTask(id);
          setTasks(updated);
        },
      },
    ]);
  };

  const startEdit = (task) => {
    setTaskInput(task.text);
    setEditingId(task.id);
  };

  const cancelEdit = () => {
    setTaskInput('');
    setEditingId(null);
  };

  const renderTask = ({ item }) => (
    <GlassCard style={styles.taskCard}>
      <TouchableOpacity
        style={styles.taskContent}
        onPress={() => handleToggleComplete(item.id, item.completed)}
      >
        {item.completed ? (
          <CheckCircle2 color={Colors.success} size={24} />
        ) : (
          <Circle color={Colors.textSecondary} size={24} />
        )}
        <Text
          style={[
            styles.taskText,
            item.completed && styles.completedText,
          ]}
        >
          {item.text}
        </Text>
      </TouchableOpacity>
      
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => startEdit(item)} style={styles.actionButton}>
          <Edit2 color={Colors.textSecondary} size={20} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.actionButton}>
          <Trash2 color={Colors.error} size={20} />
        </TouchableOpacity>
      </View>
    </GlassCard>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={Gradients.dark} style={StyleSheet.absoluteFill} />
      
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <ChevronLeft color={Colors.text} size={28} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Task Manager</Text>
        </View>

        <View style={styles.inputContainer}>
          <GlassCard style={styles.inputCard}>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                value={taskInput}
                onChangeText={setTaskInput}
                placeholder={editingId ? "Update task..." : "Add a new task..."}
                placeholderTextColor={Colors.textSecondary}
                multiline
              />
              <View style={styles.inputActions}>
                {editingId && (
                  <TouchableOpacity onPress={cancelEdit} style={styles.cancelButton}>
                    <X color={Colors.textSecondary} size={24} />
                  </TouchableOpacity>
                )}
                <TouchableOpacity onPress={handleAddOrUpdate} style={styles.addButton}>
                  <LinearGradient
                    colors={Gradients.primary}
                    style={styles.addIconGradient}
                  >
                    {editingId ? (
                      <CheckCircle2 color={Colors.white} size={24} />
                    ) : (
                      <Plus color={Colors.white} size={24} />
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </GlassCard>
        </View>

        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={renderTask}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No tasks yet. Add one to get started!</Text>
            </View>
          }
        />
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
  inputContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  inputCard: {
    padding: 12,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: Colors.white,
    fontSize: 16,
    paddingRight: 10,
    maxHeight: 100,
  },
  inputActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  addIconGradient: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    padding: 10,
  },
  listContent: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 40,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    padding: 16,
  },
  taskContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  taskText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '500',
    flexShrink: 1,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: Colors.textSecondary,
  },
  actions: {
    flexDirection: 'row',
    gap: 4,
  },
  actionButton: {
    padding: 8,
  },
  emptyContainer: {
    marginTop: 100,
    alignItems: 'center',
  },
  emptyText: {
    color: Colors.textSecondary,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default TaskManagerScreen;
