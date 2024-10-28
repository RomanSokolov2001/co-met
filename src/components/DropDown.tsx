import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { icons } from "../utils/icons";
import { useTheme } from "../hooks/useTheme";

const theme = useTheme()

export default function DropDown() {
    const [isDropped, setDropped] = useState(false)
    const [selectedOption, setSelectedOption] = useState('Local feed')
    const options = ['Local feed', 'Happening soon', 'Favourite topics']

    function doDrop() {
        setDropped(!isDropped)
    }

    function getArrow() {
        if (isDropped) {
            return icons.arrowUp
        }
        else {
            return (icons.arrowDown)
        }
    }

    function Modal({options, selectedOption, onPress}) {
       
        function onBtnPress(option) {
            setSelectedOption(option)
            setDropped(false)
        }

        return (
            <View style={styles.modalField}>
                {options.map((option) => {
                    if (option !== selectedOption)
                        return (
                            <TouchableOpacity onPress={()=>onBtnPress(option)}>
                                <View style={styles.modalBtnField}>
                                    <Text style={styles.modalBtnText}>
                                        {option}
                                    </Text>
                                </View>
                            </TouchableOpacity >
                        )
                })
                }
            </View>
        )
    }

    return (
        <View>
            <TouchableWithoutFeedback onPress={() => doDrop()}>
                <View style={styles.dropDownBtnField}>
                    <Text style={styles.title}>{selectedOption}</Text>
                    <Image
                        source={getArrow()}
                        style={styles.icon}
                    />
                </View>
            </TouchableWithoutFeedback>
            {isDropped &&
                <Modal options={options} selectedOption={selectedOption} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    dropDownBtnField: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },

    title: {
        width: 139,
        marginTop: 10,
        marginBottom: 4,
        fontFamily: 'KiwiMaru-Medium',
        fontSize: 16,
        color: theme.coal
    },
    icon: {
        marginLeft: 10,
        alignSelf: 'flex-end',
        width: 20,
        height: 20
    },

    modalField: {
        position: 'absolute',
        width: 180,
        bottom: -70,
        borderWidth: 2,
        borderColor: theme.cocao,
        borderRadius: 20,
        zIndex: 12,
        backgroundColor: theme.beige
    },
    modalBtnText: {
        paddingHorizontal: 10,
        paddingVertical: 7,
        fontFamily: 'KiwiMaru-Medium',
        fontSize: 16,
        color: theme.coal,
    },
    modalBtnField: {
        justifyContent: 'center',
    },
    line: {
        width: '95%',
        borderWidth: 0.9,
        borderColor: theme.cocao,
        alignSelf: 'center'
    }
})