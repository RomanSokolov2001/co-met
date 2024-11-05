import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

import { icons } from "../utils/icons";
import { useTheme } from "../hooks/useTheme";


interface DropDownProps {
    options: string[]
    onSelect: (option: string) => void
}

interface ModalProps {
    options: string[]
    selectedOption: string
}

export default function DropDown({ options, onSelect }: DropDownProps) {
    const [isDropped, setDropped] = useState(false)
    const [selectedOption, setSelectedOption] = useState(options[0])

    const maxModalWidth = getLongestString(options).length * 14


    function Modal({ options, selectedOption }: ModalProps) {
        function onBtnPress(option: string) {
            setSelectedOption(option)
            onSelect(option)
            setDropped(!isDropped)
        }

        return (
            <View style={[styles.modalField, { width: maxModalWidth }]}>
                {options.map((option) => {
                    if (option !== selectedOption)
                        return (
                            <TouchableOpacity onPress={() => onBtnPress(option)}>
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
            <TouchableWithoutFeedback onPress={() => setDropped(!isDropped)}>
                <View style={styles.dropDownBtnField}>
                    <Text style={styles.title}>{selectedOption}</Text>
                    <Image
                        source={isDropped ? icons.arrowUp : icons.arrowDown}
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


const theme = useTheme()

function getLongestString(arr: string[]) {
    var longestString = arr[0]
    arr.map((el) => {
        if (el.length > longestString.length) {
            longestString = el
        }
    })
    return longestString
}


const styles = StyleSheet.create({
    dropDownBtnField: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },

    title: {
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
        top: 50,
        borderWidth: 2,
        borderColor: theme.cocao,
        borderRadius: 20,
        zIndex: 12,
        backgroundColor: theme.beige,
        flexDirection: 'column'
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