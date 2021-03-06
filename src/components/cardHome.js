import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { Button } from 'native-base';
import {vw, vh} from 'react-native-expo-viewport-units'
import { API_KEY, BASE_URL } from '@env'


export default class Card extends React.Component {
    toPrice = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    render() {
        let newBtn;
        if (this.props.new) {
            newBtn = <>
                <View style={{ position: 'absolute', left: 5, top: 5 }}>
                    <Button dark small rounded>
                        <Text style={{ color: 'white', padding: 10, fontWeight: 'bold' }}>NEW</Text>
                    </Button>
                </View>
            </>
        } else {

        }
        // console.log(this.props)

        return (
            <>
                <View key={this.props.keyId}>

                </View>
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('Details', {
                            itemId: this.props.keyId,
                        })
                    }}
                >
                    <View style={{ height: 340,width:vw(44), marginHorizontal:vw(3)}}>
                        <Image source={{ uri: BASE_URL + this.props.product_img, width: vw(44), height: 215 }} style={{borderRadius:10, borderWidth:1, borderColor:'gray'}} />
                        {newBtn}
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{flexDirection:'row', marginRight:5}}><Image source={require('../assets/icons/Star.png')} style={{marginTop:2.5, marginRight:5 }} /><Text>{this.props.rating}</Text></View>
                            <Text>| Terjual ({this.props.dibeli})</Text>
                        </View>
                        <Text style={{ color: 'gray', marginTop: 5 }}>{this.props.category}</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, height:20 }}>{this.props.product_name}</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 15,height:20 }}>Rp. {this.toPrice(this.props.product_price)}</Text>
                        <Text>{this.props.size} - {this.props.color}</Text>
                    </View>
                </TouchableOpacity>
            </>
        )
    }
}