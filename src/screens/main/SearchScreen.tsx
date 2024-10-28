import { SafeAreaView, StyleSheet, View } from "react-native";
import PageHeader from "../../components/PageHeader";
import { useTheme } from "../../hooks/useTheme";
import { ScrollView } from "react-native-gesture-handler";
import { useState } from "react";
import SearchBar from "../../components/SearchBar";
import FiltersWindow from "../../components/FiltersWindow";

const theme = useTheme();

export default function SearchScreen() {
  const [input, setInput] = useState('');
  const [filtersVisible, setFiltersVisible] = useState(false);

  const toggleFilters = () => {
    setFiltersVisible((prev) => !prev);
  };

  return (
    <SafeAreaView style={styles.pageContainer}>
      <PageHeader pageName={'Search posts'} />
      <SearchBar
        onChangeText={setInput}
        value={input}
        onSettingsPress={toggleFilters}
      />
      <ScrollView>
      </ScrollView>
      <FiltersWindow
        isVisible={filtersVisible}
        onClose={toggleFilters}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.beige,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
});