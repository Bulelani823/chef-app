import { Children, ReactNode, useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { StyleSheet, Text, View, TextInput, Button, Image, ScrollView, ViewStyle, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useRef, useEffect} from 'react';
import { Animated } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { ImageSourcePropType } from 'react-native';
import { StatusBar } from 'expo-status-bar';

//ST10516653
//Bulelani jeffrey mkhize
//Lecturer: Fakazi Ngema

type MenuItem = {
  id: string;
  name: string;
  description: string;
  course: string;
  price: string;
};

const Stack = createNativeStackNavigator();

export default function App() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  return(
    <NavigationContainer>
      <Stack.Navigator
      
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2563EB',
        },
        headerTintColor:'#FFFFFF',
        headerTitleStyle:{
          fontWeight:'bold'
        },
        headerShadowVisible: false

      }}>
        <Stack.Screen name="Log In" 
        component={LogInScreen}
        options={{
            title: 'My Profile'
        }}
        >
        </Stack.Screen>

        <Stack.Screen name="Main Screen"
        component={MainScreen}
        options={{
            title:'Home'
        }}
        ></Stack.Screen>

        <Stack.Screen name="Menu" 
        options={{ 
          title: 'Restaurent Menu' 
          }}
          >
          {(props) => <Menu {...props} menuItems={menuItems} setMenuItems={setMenuItems} />}
        </Stack.Screen>

       <Stack.Screen 
        name="Dishes"
        options={{
          title: 'AddDishScreen'
        }}
      >
        {(props) => <AddDish {...props} setMenuItems={setMenuItems} />}
      </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

function sayHello(){

  let A = 70;
  let B = 300;
  let sum = A + B;

  console.log("Hello, this is MAST5112!");
  console.log("The sum for A and B is:" + sum);
}

function LogInScreen({navigation}:{navigation: any}){
  const [Name, setName] = useState('');
  const [Surname, setSurname] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [Error, setError] = useState('');

  sayHello()
 console.log("App Starting")

 return(
  <View style={styles.container}>
      <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollContainer}
      style={{height: 600}}>
       <FadeInView>
      <View style={styles.logoCircle}>
        <Image   
        source={require('./images/chef.jpg')}  
        style={styles.logoImage}
        />
      </View>
      <Text style={styles.welcomeText}>Welcome to the Chef's Den</Text>
      <Text style={styles.welcomeSubtitle}>
        Create your profile
      </Text>
      <Text style={styles.description}>
        Enter your details below to continue to our main page
      </Text>

      <Text style={styles.red}> 
        {Error !== ''&&(
          <View style={styles.errorBox} >
            <Text style={styles.errorText} >
              {Error}

            </Text>

          </View>
        )} 
        </Text>

        
      <View style={styles.inputWrapper}>
      <Text style={styles.inputLabel}>
        First Name: </Text>
      <TextInput style={styles.modernInput} 
      placeholder="Enter your first name " 
      placeholderTextColor="#94A3B8"
      value={Name}
      onChangeText={newText => setName(newText)} />
      </View>


      <View style={styles.inputWrapper}>
      <Text style={styles.inputLabel}>
        Surname:  </Text>
      <TextInput style={styles.modernInput} 
      placeholder="Enter Your Surname"
      placeholderTextColor="#94A3B8"
      value={Surname}
      onChangeText={newText => setSurname(newText)}/>
      </View>

      <View style={styles.inputWrapper}>
      <Text style={styles.inputLabel}>
         Enter your phone number: </Text> 
      <TextInput style={styles.modernInput} 
      placeholder="Enter your Phone Number"
      placeholderTextColor="#94A3B8" 
      onChangeText={newText => setPhoneNumber(newText) }/> 
      </View>

      <TouchableOpacity
      style={styles.primaryButton}
      activeOpacity={0.8}
      onPress={() => {
        if ((isEmpty(Name)==false) && (isEmpty(Surname)==false) && (isEmpty(PhoneNumber)==false)){

        navigation.navigate('Main Screen', {
          Namesend : Name,
          Surnamesend : Surname,
          Phonenumbersend : PhoneNumber,
        });
        console.log("Name: " + Name + 
           "Surname: " + Surname +    
           "Phone Number: " + PhoneNumber )

      setError("");
      }
      else{
        setError("Please add all the fields");
      }  

      }}
      >
        <Text style={styles.primaryButtonText}>
          Continue
        </Text>
      </TouchableOpacity>


      <Button 
      color='#3c992f'
      title="Add User"
      
      onPress={() =>{

        if ((isEmpty(Name)==false) && (isEmpty(Surname)==false) && (isEmpty(PhoneNumber)==false)){

        navigation.navigate('Main Screen', {
          Namesend : Name,
          Surnamesend : Surname,
          Phonenumbersend : PhoneNumber,
        });
        console.log("Name: " + Name + 
           "Surname: " + Surname +    
           "Phone Number: " + PhoneNumber )

      setError("");
      }
      else{
        setError("Please add all the fields");
      }  
      }}
      
      /> 

      </FadeInView> 
      </ScrollView>
      </SafeAreaView>

    </View>

  
 );
}

function isEmpty(value : string){
  return(
    (value == null) ||
    (value.hasOwnProperty('length') && value.length === 0) ||
    (value.constructor === Object && Object.keys(value).length === 0)
  )
}

function MainScreen({navigation, route}:{navigation: any; route: any}){
  const NameGet = route.params.Namesend;
  const SurnameGet = route.params.Surnamesend;
  const PhonenumberGet = route.params.Phonenumbersend;
  const [selectedValue, setSelectedValue] = useState('0');
  const [iSelected, setIntValue] = useState(0);

  const blockArray: (ImageSourcePropType | undefined)[]=[
    undefined,
  require('./images/pasta.jpg'),
  require('./images/beans.jpeg'),
  require('./images/pancakes.jpg'),
  ];

  const getCourseName=() => {
    if(selectedValue === '1'){
      return 'Pasta'
    }
    if(selectedValue === '2'){
      return 'Beans with Hot Dog'
    }
    if(selectedValue === '3'){
      return 'Pancakes'
    }
    return 'Not Selected'
  };

  return(
    <ScrollView contentContainerStyle={styles.scrollContainer}>

     <View style={styles.mainInnerContainer} >
    <View style={styles.mainCenterContainer}>

    <View style={styles.greetingCard}>

      <View style={styles.avatarCircle}>

        <Text style={styles.avatarText}>
          {NameGet.charAt(0).toUpperCase()}
        </Text>
      </View>

      <Text style={styles.detailsWelcome}>
        Hello, {NameGet} {SurnameGet}, {PhonenumberGet}
      </Text>

      <Text style={styles.headingPage}>Welcome to the Chef's Menu</Text>
      <Text style={styles.subPage}>This is for our chef's to release the best dishes out to the users</Text>

      <Text style={styles.subPage}>We make sure to release and produce the best state of the art dishes by the best chefs</Text>


      <Text style={{fontFamily: 'Ariel', fontSize: 20, fontStyle: 'italic', color: 'black', marginTop: 10, paddingTop: 10}}>
        Recommended Foods
      </Text>

      </View>
    </View>

    <View style={styles.RadioContainer}> 
      <View style={styles.radioGroup}>

        <TouchableOpacity 
        activeOpacity={0.8}
        style={[

          styles.languageOption,
          selectedValue === '1' &&
          styles.selectedLanguageOption
        ]}
        onPress={() => setSelectedValue('1')}>

          <RadioButton.Android
          value='1'
          status={
            selectedValue === '1'
            ? 'checked'
            : 'unchecked'
          }
          onPress={() => setSelectedValue('1')}
          color='blue'
          />

          <View style={styles.languageTextContainer}>
            <Text style={styles.languageTitle}>
              Pasta
            </Text>

            <Text style={styles.languageDescription}>
              Lovely pasta with a hint of cheese and chicken  
            </Text>
          </View>
              
        </TouchableOpacity>

        <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.languageOption,
          selectedValue === '2' &&
          styles.selectedLanguageOption,
        ]}
        onPress={() => setSelectedValue('2')}
        >
          <RadioButton.Android
          value="2"
          status={
            selectedValue === '2'
            ? 'checked'
            : 'unchecked'
          }
          onPress={() => setSelectedValue('2')}
          color='blue'
          />
          <View style={styles.languageTextContainer}>
            <Text style={styles.languageTitle}>
              Beans with Hot Dog
            </Text>

            <Text style={styles.languageDescription}>
              Thick sausage inside a bun with tomato and beans for a nutritional balance
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.languageOption,
          selectedValue === '3' &&
          styles.selectedLanguageOption,
        ]}
        onPress={() => setSelectedValue('3')}
        >
          <RadioButton.Android
          value="3"
          status={
            selectedValue === '3'
            ? 'checked'
            : 'unchecked'
          }
          onPress={() => setSelectedValue('3')}
          color='blue'
          />
          <View style={styles.languageTextContainer}>
            <Text style={styles.languageTitle}>
              Pancakes
            </Text>

            <Text style={styles.languageDescription}>
             Lucious, and delicious pancakes with a hint of syrup
            </Text>
          </View>
        </TouchableOpacity>

      </View>

    </View>

    <View style={{flex: 1}}>
      <Text style={{fontWeight: 'bold', flex: 0, paddingTop: 30, paddingBottom: 15, justifyContent: 'center', textAlign: 'center', alignItems: 'center'}}>
        View what your selected food course says about you:

      </Text>

      <Text style={{fontWeight: 'bold', flex: 0, paddingBottom: 15, justifyContent: 'center', textAlign: 'center', alignItems: 'center'}}>
       Starters - Main Courses - Desserts - Professionals - Witty Chef team - Friendly and Save Environment

      </Text>

      <TouchableOpacity
      style={styles.primaryButton}
      activeOpacity={0.8}
      onPress={() => {
        setIntValue(Number(selectedValue));
      }}
      >
      <Text style={styles.primaryButtonText}>
        Show my Choice
      </Text>
      </TouchableOpacity>

      <TouchableOpacity
      style={styles.primaryButton}
      activeOpacity={0.8}
      onPress={() => {
        navigation.navigate("Menu")
      }}
      >
        <Text style={styles.primaryButtonText}>
          Restaurant Menu
        </Text>
      </TouchableOpacity>

      <View style={styles.resultCard}>
        <Text style={styles.resultLabel}>
          Your Selection 
        </Text>
        <Text style={styles.resultLanguage}>
          {getCourseName()}
          
        </Text>
        <Image source={blockArray[iSelected]} style={styles.ViewImage}></Image>
      </View>
  </View>  
  </View>
  </ScrollView>

  )
}

function Menu({navigation, menuItems, setMenuItems}:{navigation: any; menuItems: MenuItem[]; setMenuItems: any}){

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const removeDishHandler = (idToRemove: string) => {
    setMenuItems((prevItems: MenuItem[]) => prevItems.filter((item) => item.id !== idToRemove));
  };

  // Filter and Search logic combined
  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'All' || item.course === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  // Calculate statistics: total items, average price, and counts per course type
  const totalItems = menuItems.length;
  const averagePrice = totalItems > 0 
    ? (menuItems.reduce((sum, item) => sum + parseFloat(item.price || '0'), 0) / totalItems).toFixed(2) 
    : '0.00';
  
  const starterCount = menuItems.filter(item => item.course === 'Starter').length;
  const mainCourseCount = menuItems.filter(item => item.course === 'Main Course').length;
  const dessertCount = menuItems.filter(item => item.course === 'Dessert').length;

   const renderMenuItems = () => {
    const arrOutput = [];

    for (let i = 0; i < filteredItems.length; i++) 
      {
      arrOutput.push(
        <View key={filteredItems[i].id} style={styles.resultCard}>
          <Text style={styles.resultLanguage}>Name: {filteredItems[i].name}</Text>
          <Text style={styles.inputLabel}>Course: {filteredItems[i].course}</Text>
          <Text style={styles.description}>Description: {filteredItems[i].description}</Text>
          <Text style={styles.resultLabel}>Price: R{filteredItems[i].price}</Text>

           <TouchableOpacity onPress={() => removeDishHandler(filteredItems[i].id)}
          style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>Remove</Text>

        </TouchableOpacity>
        </View>
      );
    }
    return arrOutput;
  };
    return (
   <SafeAreaView style={styles.safeArea}> 
      <StatusBar style="light" /> 
      <ScrollView contentContainerStyle={styles.skillsScroll}>
        <View style={styles.appContainer}>
          <View style={styles.bannerContainer}>
          <Image 
          style={styles.BannerImage}
          source={require('./images/banners.jpeg')}
          resizeMode="center"
          />
        </View>
          
          {/* Header Banner Section */}
          <Text style={styles.welcomeTitle}>Chef Dean's Menu</Text>

          {/* Menu Statistics Summary Card (POE Requirement) */}
          <View style={styles.statsCard}>
            <Text style={styles.statsTitle}>Menu Statistics Overview</Text>
            <Text style={styles.statsText}>Total Menu Items: {totalItems}</Text>
            <Text style={styles.statsText}>Average Price: R{averagePrice}</Text>
            <Text style={styles.statsText}>Starters: {starterCount} | Main Courses: {mainCourseCount} | Desserts: {dessertCount}</Text>
          </View>

          {/* Search Bar Feature */}
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.modernInput}
              placeholder="Search dishes by name or description..."
              placeholderTextColor="#94A3B8"
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
            />
          </View>

          {/* Filter Section Buttons */}
          <View style={styles.filterContainer}>
            {['All', 'Starter', 'Main Course', 'Dessert'].map((filterOption) => (
              <TouchableOpacity
                key={filterOption}
                style={[
                  styles.filterButton,
                  selectedFilter === filterOption && styles.activeFilterButton
                ]}
                onPress={() => setSelectedFilter(filterOption)}
              >
                <Text style={[
                  styles.filterButtonText,
                  selectedFilter === filterOption && styles.activeFilterButtonText
                ]}>
                  {filterOption}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          {/* Total Dish Counter */}
          <View style={styles.skillsCounter}>
            <Text style={styles.skillsCounterText}>
              Total Showing Dishes: {filteredItems.length} (Total: {menuItems.length})
            </Text>
          </View>

          {/* Display empty state message if no items are added yet */}
          {menuItems.length === 0 ? (
            <View style={styles.addSkillCard}>
              <Text style={styles.sectionSubtitle}>
                No menu items have been added yet. Please Tap 'Add New Menu Item' below to create a dish.
              </Text>
            </View>
          ) : filteredItems.length === 0 ? (
            <View style={styles.addSkillCard}>
              <Text style={styles.sectionSubtitle}>
                No dishes found matching your search or filter criteria.
              </Text>
            </View>
          ) : (
            <View style={styles.skillListSection}>
              <Text style={styles.sectionTitle}>Current Menu Items</Text>
              {renderMenuItems()}
              
            </View>
          )}

  
          {/* Button to navigate to Add Dish screen */}
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate("Dishes")}
          >
            <Text style={styles.primaryButtonText}>Add New Menu Item</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );

}

function AddDish({ navigation, setMenuItems }: { navigation: any; setMenuItems: any }) {
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('Starter');
  const [price, setPrice] = useState('');
  const [Error, setError] = useState('');
  const [successful, setSuccessful] = useState('');
  const [txtDishes, setTxtDishes] = useState<string>('');

  const handleAddDish = () => {
    if (
      isEmpty(txtDishes) === false &&
      isEmpty(description) === false &&
      isEmpty(course) === false &&
      isEmpty(price) === false
    ) {
      const newDish = {
        id: Date.now().toString() + Math.random().toString(),
        name: txtDishes,
        description: description,
        course: course,
        price: price,
      };
  
      setMenuItems((prevItems: any[]) => [...prevItems, newDish]);
      
      setTxtDishes('');
      setDescription('');
      setPrice('');
      setError('');
      setSuccessful('Menu item successfully added!');

      navigation.navigate('Menu');
    } else {
      setSuccessful('');
      setError('Please fill in all required fields!');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.skillsScroll}>
        <View style={styles.appContainer}>

          <View style={styles.bannerContainer}>
            <Image 
              style={styles.BannerImage}
              source={require('./images/banners.jpeg')}
              resizeMode="center"
            />
          </View>
          <Text style={styles.welcomeTitle}>Add a New Dish</Text>

          {Error !== '' && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{Error}</Text>
            </View>
          )}

          {successful !== '' && (
            <View style={styles.greetingCard}>
              <Text style={styles.detailsSubtitle}>{successful}</Text>
            </View>
          )}

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Dish Name:</Text>
            <TextInput
              style={styles.modernInput}
              placeholder="e.g. Garlic Bread"
              placeholderTextColor="#888"
              value={txtDishes}
              onChangeText={(text) => setTxtDishes(text)}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Description:</Text>
            <TextInput
              style={styles.modernInput}
              placeholder="e.g. Freshly baked bread with butter and garlic"
              placeholderTextColor="#888"
              value={description}
              onChangeText={(text) => setDescription(text)}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Select Course:</Text>

            <TouchableOpacity
              style={styles.languageOption}
              onPress={() => setCourse('Starter')}
            >
              <RadioButton
                value="Starter"
                status={course === 'Starter' ? 'checked' : 'unchecked'}
                onPress={() => setCourse('Starter')}
                color="#3300ff"
              />
              <Text style={styles.languageTitle}>Starter</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.languageOption}
              onPress={() => setCourse('Main Course')}
            >
              <RadioButton
                value="Main Course"
                status={course === 'Main Course' ? 'checked' : 'unchecked'}
                onPress={() => setCourse('Main Course')}
                color="#3300ff"
              />
              <Text style={styles.languageTitle}>Main Course</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.languageOption}
              onPress={() => setCourse('Dessert')}
            >
              <RadioButton
                value="Dessert"
                status={course === 'Dessert' ? 'checked' : 'unchecked'}
                onPress={() => setCourse('Dessert')}
                color="#3300ff"
              />
              <Text style={styles.languageTitle}>Dessert</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Price (R):</Text>
            <TextInput
              style={styles.modernInput}
              placeholder="e.g. 67.00"
              placeholderTextColor="#888"
              keyboardType="numeric"
              value={price}
              onChangeText={(text) => setPrice(text)}
            />
          </View>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleAddDish}
          >
            <Text style={styles.primaryButtonText}>Submit New Dish</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d6d6d6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainInnerContainer: { 
    flex: 1 
  },
  mainCenterContainer: {
     alignItems: 'center' 
  },
  welcomeText: {
    paddingTop: 60,
    paddingBottom: 50,
    color: 'purple',
    fontWeight: 'bold',
    fontFamily: 'Ariel',
    fontSize: 40,
    textAlign: 'center',
  },
  red: {
    fontFamily: 'Ariel',
    fontSize: 35,
    fontWeight: 'bold',
    color: 'red',
    paddingTop: 5,
    textAlign: 'center',
  },
RadioContainer: {
    paddingVertical: 10,
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
radioGroup: {
    width: '100%',
    flexDirection: 'column',
    borderRadius: 12,
    backgroundColor: '#9f9f9f',
    padding: 12,
    elevation: 4,
  },
  ViewImage: {
    width: 200,
    height: 300,
    alignContent: 'center'
  },
  BannerImage: {
    height: 200,
    alignContent: 'center',
  },
  appContainer: {
    flex: 1,
    padding: 50,
    paddingHorizontal: 16,
  },
  deleteButton: {
    backgroundColor: 'red',
    minHeight: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    elevation: 3,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  inputWrapper:{
    marginBottom: 18,
  },
  inputLabel:{
    fontSize: 12,
    fontWeight: '700',
    color: 'grey',
    marginBottom: 8,  
  },
  modernInput: {
    height: 52,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 15,
    color: 'black',
    backgroundColor: 'white'
  },
  logoCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'white',
    justifyContent: 'center',
    elevation: 6,
  },
  errorBox: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    fontWeight: '600',
  },
  logoImage: {
    width: 125,
    height: 125,
    resizeMode: 'contain'
  },
  welcomeTitle: {
    marginTop: 32,
    fontSize: 32,
    fontWeight: '800',
    color: 'black',
  },
  welcomeSubtitle: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: '600',
    color: 'blue',
  },
  description: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'center',
    color: '#64748B',
    maxWidth: 310,
  },
  primaryButton: {
    backgroundColor: '#2563EB',
    minHeight: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    elevation: 3,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '800', 
  },
  greetingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 12,
    padding: 20,
    width: '100%',
    maxWidth: 600,
    alignItems: 'center',
    elevation: 4,
  },
  avatarCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  avatarText: {
    fontSize: 30,
    fontWeight: '800',
    color: 'black',
    textAlign: 'center',
  },
  detailsWelcome: {
    fontSize: 23,
    fontWeight: '800',
    color: 'black',
    textAlign: 'center',
  },
  detailsSubtitle: {
    fontSize: 14,
    color: '#647488',
    textAlign: 'center',
    marginTop: 7,
  },
languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '100%',
  },
  selectedLanguageOption: {
    backgroundColor: 'white',
    borderColor: 'blue',
    borderWidth: 2,
  },
  languageTextContainer: {
    flex: 1,
    flexShrink: 1,
    marginLeft: 8,
  },
  languageTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E293B'
  },
  languageDescription: {
    fontSize: 12,
    color: 'grey',
    marginTop: 3,
  },
  resultCard: {
    backgroundColor: '#f8f5f5',
    borderRadius: 20,
    padding: 20,
    marginTop: 18,
    alignItems: 'center',
    elevation: 4,
  },
  resultLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: 'grey',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  resultLanguage: {
    fontSize: 25,
    fontWeight: '800',
    color: 'blue',
    marginTop: 5,
    marginBottom: 15,
  },
  bannerContainer:{
    height: 220,
    position: 'relative',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addSkillCard: {
    backgroundColor: '#FFFFFF',
    margin: 18,
    marginBottom: 5,
    borderRadius: 20,
    elevation: 4,
  },
  sectionTitle:{
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  sectionSubtitle:{
    fontSize: 13,
    color: '#64748B',
    marginTop: 4,
    marginBottom: 16,
  },
  scrollContainer: {
    padding: 20,
  },
  headingPage: {
    color: '#0400ff',
    fontSize: 30,
    fontWeight: '800',
    fontStyle: 'italic',
    fontFamily: 'Ariel',
    marginTop: 20,
  },
  subPage: {
    color: 'black',
    fontSize: 20,
    fontStyle: 'italic',
    fontFamily: 'Ariel',
  },
  skillsCounter: {
    backgroundColor: '#0077ff',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: 'center',
    marginVertical: 10
  },
  skillsCounterText: {
    color: '#000000',
    fontWeight: 'bold',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    marginHorizontal: 3,
    backgroundColor: '#E2E8F0',
    borderRadius: 8,
    alignItems: 'center',
  },
  activeFilterButton: {
    backgroundColor: '#2563EB',
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  activeFilterButtonText: {
    color: '#FFFFFF',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#697683',
  },
  skillsScroll: {
    padding: 16,
  },
  skillListSection: {
    width: '100%',
  },
  statsCard: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    borderRadius: 14,
    padding: 16,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 2,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E3A8A',
    marginBottom: 6,
  },
  statsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    marginVertical: 2,
  },
});

const FadeInView = (props: { children: ReactNode; style?: ViewStyle }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={{ ...props.style, opacity: fadeAnim }}>
      {props.children}
    </Animated.View>
  );
};