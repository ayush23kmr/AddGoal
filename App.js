import { StatusBar } from 'expo-status-bar';
import {  StyleSheet,View,FlatList,Button} from 'react-native';
import { useState } from 'react';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [modalIsVisibile,setModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);


function startAddGoalHandler(){
  setModalIsVisible(true);
}

function endAddGoalHandler(){
  setModalIsVisible(false);
};

function addGoalHandler(enteredGoalText){
//setCourseGoals([...courseGoals,enteredGoalText]);
// first approach
// setCourseGoals(currentCourseGoals =>[...courseGoals,{text:enteredGoalText,key: Math.random().toString() },
// ]);

// second approach
setCourseGoals((currentCourseGoals) =>[...courseGoals,{ text:enteredGoalText, id: Math.random().toString() },
]);

endAddGoalHandler();
}

function deleteGoalHandler(id){
setCourseGoals(currentCourseGoals => {
  return currentCourseGoals.filter((goal) => goal.id !== id);
});
};

  return (
    <>
    <StatusBar style="light"/>
    <View style={styles.appContainer}>
      <Button 
      title='Add New Goal' 
      color="#a065ec" 
      onPress={startAddGoalHandler}
      />
    <GoalInput 
    visible={modalIsVisibile}  
    onAddGoal={addGoalHandler} 
    onCancel={endAddGoalHandler}
    />
      <View style={styles.goalsContainer}>
      <FlatList 
      data={courseGoals} 
      renderItem={(itemData) => {
        return <GoalItem text={itemData.item.text} 
        id = {itemData.item.id}
        onDeleteItem={deleteGoalHandler}/>;
        }} 
        keyExtractor={(item,index) => {
          return item.id;
        }}
        alwaysBounceVertical={false}/>
        {/* {courseGoals.map((ayush) => (  // because we using flatlist
       <View key= {ayush} style={styles.goalItem}>
      <Text>{ayush}</Text>
      </View> 
       ))} */}
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer:{
    flex:1,
    paddingTop:50,
    paddingHorizontal:16,
   },
  goalsContainer:{
    flex:3
  },
  
});
