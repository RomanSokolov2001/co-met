import { useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import PageHeader from "../../components/PageHeader";
import { useTheme } from "../../hooks/useTheme";
import SearchBar from "../../components/SearchBar";
import FiltersWindow from "../../components/FiltersWindow";
import FilteredPostsView from "../../components/FilteredPostsView";



export default function SearchScreen() {
  const [input, setInput] = useState('');
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [location, setLocation] = useState('')
  const [tags, setTags] = useState([])

  const toggleFilters = () => {
    setFiltersVisible((prev) => !prev);
  };

  return (
    <View style={styles.pageContainer}>
      <PageHeader pageName={'Search posts'}/>
      <SearchBar
        onChangeText={setInput}
        value={input}
        onSettingsPress={toggleFilters}
      />
      <FilteredPostsView location={location} tags={tags}/>
      <FiltersWindow
        isVisible={filtersVisible}
        onClose={toggleFilters}
        setLocation={setLocation}
        setTags={setTags}
      />
    </View>
  );
}


const theme = useTheme();
const BAR_WIDTH = StatusBar.currentHeight


const styles = StyleSheet.create({
  pageContainer: {
    paddingTop: BAR_WIDTH,
    width: '100%',
    height: '100%',
    backgroundColor: theme.beige,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
});