import React, { Component } from 'react'
import { Image, Dimensions, StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Picker } from 'react-native';
import CardProduct from './../../components/card'
import Review from './../../components/review'
import { Left, Body, Right, Title, Button, Container, Header } from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid'
import axios from 'axios'
import {connect} from 'react-redux'
import {BASE_URL} from '@env'


class DetailPage extends Component {
    state = {
        product: [],
        foryou:[],
        itemsId:this.props.route.params.itemId,
        selectedSize: 0,
        selectedColor:0
    };

    componentDidMount = () => {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            if (this.props.auth.isLogin) {
                this.props.navigation.navigate('Login')
            }
        });

        axios.get(`${BASE_URL}/product/` + this.props.route.params.itemId)
            .then(({ data }) => {
                this.setState({
                    product: data.data
                })
            }).catch((error) => {
                console.log(error)
            })

    }

    componentWillUnmount() {
        this._unsubscribe()
    }

    setSize = (e) => {
        this.setState({
            selectedSize: e
        })
    }

    setColor = (e) => {
        this.setState({
            selectedColor: e
        })
    }


    render() {
        const { product } = this.state

        console.log(this.state.product[0])
        return (
            <>
                <Header transparent style>
                    <Left>
                        <Button transparent
                            onPress={() => { this.props.navigation.goBack() }}
                        >
                            <Image source={require('./../../assets/back.png')} />
                        </Button>
                    </Left>
                    <Body >
                        <Title style={{ color: 'black', marginLeft: 18, fontWeight: 'bold' }}>Detail Product</Title>
                    </Body>
                </Header>

                {
                    product && product.map(({ product_id, product_name, category_name, product_desc, product_img, product_price }) => {
                        return (
                            <>
                                <Container>
                                    <Grid>
                                        <SafeAreaView>
                                            <ScrollView id={product_id}>
                                                <Row size={50}>
                                                    <View style={styles.imgwrap}>
                                                        <SafeAreaView>
                                                            <ScrollView horizontal={true}>
                                                                {
                                                                    product_img && product_img.split(',').map((img) => {
                                                                        return (
                                                                            <>
                                                                                <Image source={{ uri: BASE_URL + img, width: 360, height: 400 }} />
                                                                            </>
                                                                        )
                                                                    })
                                                                }
                                                            </ScrollView>
                                                        </SafeAreaView>
                                                    </View>
                                                </Row>

                                                <Row size={50}>
                                                    <View style={styles.container}>
                                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                            <View style={styles.size}>
                                                                <Picker
                                                                    selectedValue={this.state.selectedSize}
                                                                    onValueChange={(itemValue, itemIndex) => this.setSize(itemValue)}
                                                                >
                                                                    <Picker.Item label="Size" value="0" style={{backgroundColor:'gray'}} />
                                                                    <Picker.Item label="XS" value="1" />
                                                                    <Picker.Item label="S" value="2" />
                                                                    <Picker.Item label="M" value="3" />
                                                                    <Picker.Item label="L" value="4" />
                                                                    <Picker.Item label="XL" value="5" />
                                                                </Picker>
                                                            </View>
                                                            <View style={styles.size}>
                                                                <Picker
                                                                    selectedValue={this.state.selectedColor}
                                                                    onValueChange={(itemValue, itemIndex) => this.setColor(itemValue)}
                                                                >
                                                                    <Picker.Item label="Color" value="0" />
                                                                    <Picker.Item label="Red" value="1" />
                                                                    <Picker.Item label="Green" value="2" />
                                                                    <Picker.Item label="Blue" value="3" />
                                                                    <Picker.Item label="Black" value="4" />
                                                                </Picker>
                                                            </View>
                                                            <TouchableOpacity>
                                                                <View style={styles.love}>
                                                                    <Image source={require('./../../assets/fav.png')} />
                                                                </View>
                                                            </TouchableOpacity>
                                                        </View>
                                                        <View style={styles.wraptitle}>
                                                            <Text style={styles.title}>{product_name}</Text>
                                                            <Text style={styles.title}>Rp. {product_price}</Text>
                                                        </View>
                                                        <Text style={styles.PrdName}>{category_name}</Text>
                                                        <View>
                                                            <Image source={require('./../../assets/icons/rating.png')} />
                                                            <Text style={styles.PrdName}> (10)</Text>
                                                        </View>
                                                        <Text style={styles.desc}>
                                                            {product_desc}
                                                        </Text>

                                                        {/* <ListBar nav={navigation} /> */}
                                                        <View style={styles.text}>
                                                            <Text style={{ fontFamily: 'Metropolis', fontSize: 18 }}>
                                                                You can also like this
                                        </Text>
                                                            <Text
                                                                style={{
                                                                    fontFamily: 'Metropolis-Light',
                                                                    fontSize: 11,
                                                                    color: '#9B9B9B',
                                                                }}>
                                                                3 items
                                        </Text>
                                                        </View>
                                                        <SafeAreaView>
                                                            <ScrollView horizontal={true}>
                                                                <View style={styles.card}>
                                                                    <CardProduct navigation={this.props.navigation} />
                                                                    <CardProduct navigation={this.props.navigation} />
                                                                    <CardProduct navigation={this.props.navigation} />
                                                                </View>
                                                            </ScrollView>
                                                        </SafeAreaView>
                                                        <Review />
                                                    </View>
                                                </Row>
                                            </ScrollView>
                                        </SafeAreaView>
                                    </Grid>

                                    <Button danger full rounded style={{ marginTop: 15 }}>
                                        <TouchableOpacity
                                            onPress={() => { this.props.navigation.navigate('MyBag') }}
                                        >
                                            <Text style={{ color: '#fff' }}> Add to Cart </Text>
                                        </TouchableOpacity>
                                    </Button>
                                </Container>
                            </>
                        )
                    })
                }
            </>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    return {
        auth
    };
};

export default connect(mapStateToProps)(DetailPage);

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        marginLeft: windowWidth * 0.02,
        marginRight: windowWidth * 0.02,
        marginTop: windowWidth * 0.04,
    },
    imgwrap: {
        flexDirection: 'row',
    },
    image: {
        width: 275,
        height: 413,
    },
    addcart: {
        position: 'absolute',
        bottom: 0,
        top: undefined,
    },
    btn: {
        backgroundColor: '#DB3022',
        width: "100%",
        height: 48,
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 24,
    },
    title: {
        fontFamily: 'Metropolis-Light',
        fontSize: 24,

    },
    wraptitle: {
        flexDirection: 'row',
        marginTop: 22,
        justifyContent: 'space-between',
        marginRight: 20
    },
    PrdName: {
        fontFamily: 'Metropolis-Light',
        fontSize: 11,
        color: '#9B9B9B',
    },
    rating: {
        flexDirection: 'row',
        marginVertical: 5,
    },
    desc: {
        fontFamily: 'Metropolis',
    },
    text: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
        marginBottom: 12,
    },
    card: {
        flexDirection: 'row',
    },
    sizecontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    love: {
        height: 36,
        width: 36,
        alignItems: 'center',
        paddingVertical: 13,
        borderRadius: 18,
    },
    size: {
        width: 160,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#9B9B9B',
        // paddingHorizontal: 5,
    },
});