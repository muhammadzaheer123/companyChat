import React, { useEffect } from 'react';
import {View,Text,Image} from 'react-native';
import { useDispatch} from 'react-redux';
import {connect} from 'react-redux';

import { fetchRecipes, recipesSelector } from '../Redux/user'

function App(props) {
  const dispatch = useDispatch()

  useEffect(() => {
    props.fetchRecipes();
  }, [dispatch])

  const renderRecipes = () => {
      const {recipes}=props.reducer


    return recipes.meals!=undefined?recipes.meals.map(recipe =>
      <View key={recipe.idMeal} >
        <Text>{recipe.strMeal}</Text>
        <Image source={recipe.strMealThumb} />
      </View>
    )
    :null
  }

  return (
    <View>
      <Text>Recipes</Text>
      <View>
         {renderRecipes()} 
      </View>
    </View>
  )
}
const mapStateToProps=(state)=>{
  
console.log('.................',state.initialReducer)
return{reducer:state.initialReducer}
  
}
const  mapDispatchToProps={fetchRecipes};

export default connect(mapStateToProps, mapDispatchToProps)(App)