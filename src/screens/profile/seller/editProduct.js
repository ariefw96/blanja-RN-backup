import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Picker } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Button, Label, Textarea, Left, Body, Right } from 'native-base';
import { BASE_URL } from "@env"
import axios from 'axios'
import ImagePicker from 'react-native-image-crop-picker';
import { connect } from 'react-redux'

class AddProduct extends React.Component {
    state = {
        product_name: '',
        category_id: 0,
        product_price: 0,
        product_desc:'',
        photoFromDB: '',
        product_img: [],
        taken_pic: {},
        isSetImage: false
    }

    setCategory = (e) => {
        this.setState({
            category_id: e
        })
    }

    getUpdateData = () => {
        const config = {
            headers: {
                'x-access-token': 'Bearer ' + this.props.auth.token,
            },
        };
        axios.get(BASE_URL + '/product/getProductData/' + this.props.route.params.itemId, config)
            .then(({ data }) => {
                // console.log(data.data)
                this.setState({
                    product_name: data.data.product_name,
                    category_id: ''+data.data.category_id,
                    product_price: ''+data.data.product_price,
                    product_desc: data.data.product_desc,
                    photoFromDB: data.data.product_img
                })
            }).catch(({ response }) => {
                console.log(response.data)
            })
    }

    componentDidMount = () => {
        this.getUpdateData()
    }

    chooseFile = () => {
        ImagePicker.openPicker({
            multiple: true,
            mediaType: 'photo',
        })
            .then((images) => {
                console.log(images.length);
                this.setState({ product_img: images, isSetImage:true });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    takePicture = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
            mediaType: 'photo',
        })
            .then((images) => {
                console.log(images.length);
                this.setState({ taken_pic: images, isSetImage:true });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    postProduct = () => {
        const config = {
            headers: {
                'x-access-token': 'Bearer ' + this.props.auth.token,
                'Content-type': 'multipart/form-data',
            },
        };
        const data = new FormData();
        data.append('product_name', this.state.product_name);
        data.append('category_id', this.state.category_id);
        data.append('product_price', this.state.product_price);
        data.append('product_desc', this.state.product_desc);
        data.append('user_id', this.props.auth.id);
        if (Object.keys(this.state.taken_pic).length > 0) {
            data.append('product_img', {
                name: this.state.taken_pic.path.split('/').pop(),
                type: this.state.taken_pic.mime,
                uri:
                    Platform.OS === 'android'
                        ? this.state.taken_pic.path
                        : this.state.taken_pic.path.replace('file://', ''),
            })
        }
        if (this.state.product_img[0]) {
            for (let i = 0; i < this.state.product_img.length; i++) {
                data.append('product_img',
                    {
                        name: this.state.product_img[i].path.split('/').pop(),
                        type: this.state.product_img[i].mime,
                        uri:
                            Platform.OS === 'android'
                                ? this.state.product_img[i].path
                                : this.state.product_img[i].path.replace('file://', ''),
                    }
                );
            }
        }

        console.log(data);
        axios
            .patch(BASE_URL + `/product/updateProduct/`+this.props.route.params.itemId, data, config)
            .then((data) => {
                console.log(data.data);
                alert('produk berhasil diupdate')
                this.props.navigation.navigate('ListProduct')
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    }

    render() {
        const { product_name, category_id, product_price, product_desc, product_img, taken_pic, isSetImage } = this.state
        let thumbPhoto;
        let {photoFromDB} = this.state
        photoFromDB = photoFromDB.split(',')
        if (!isSetImage) {
            thumbPhoto =
                <>
                    {
                        photoFromDB && photoFromDB.map((items) => <>
                            <Image
                                source={{ uri: BASE_URL + items }}
                                style={styles.imageStyle}
                            />
                        </>)
                    }
                </>
        }
        console.log(this.state)
        let prevImgFromCamera;
        if (Object.keys(this.state.taken_pic).length > 0) {
            prevImgFromCamera =
                <>
                    <Image
                        source={{ uri: taken_pic.path }}
                        style={styles.imageStyle}
                    />
                </>
        }
        return (
            <>
                <Container>
                    <Header transparent>
                        <Left>
                            <Button transparent
                                onPress={() => { this.props.navigation.goBack() }}
                            >
                                <Image source={require('./../../../assets/back.png')} />
                            </Button>
                        </Left>
                        <Body><Text style={{ fontSize: 24, fontWeight: 'bold' }}>Edit Product</Text></Body>
                    </Header>
                    <Content style={{ marginHorizontal: 2, backgroundColor: 'white' }}>

                        <ScrollView style={{ height: 540, backgroundColor: 'white' }}>
                            <View>
                                <Form>
                                    <Item floatingLabel>
                                        <Label >Product Name</Label>
                                        <Input name="product_name" value={product_name} onChangeText={(text) => { this.setState({ product_name: text }) }} />
                                    </Item>
                                    <View style={styles.size}>
                                        {/* <Text>{category_id}</Text> */}
                                        <Picker
                                            selectedValue={category_id}
                                            onValueChange={(itemValue, itemIndex) => this.setCategory(itemValue)}
                                        >
                                            <Picker.Item label="Category" value="0" style={{ backgroundColor: 'gray' }} />
                                            <Picker.Item label="T-shirt" value="1" />
                                            <Picker.Item label="Short" value="2" />
                                            <Picker.Item label="Jacket" value="3" />
                                            <Picker.Item label="Pants" value="4" />
                                            <Picker.Item label="Shoes" value="5" />
                                        </Picker>
                                    </View>
                                    <Item floatingLabel>
                                        <Label >Price</Label>
                                        <Input name="price" value={product_price} onChangeText={(text) => { this.setState({ product_price: text }) }} />
                                    </Item>
                                    <Textarea rowSpan={5} bordered placeholder="Description" name="description" value={product_desc} onChangeText={(text) => { this.setState({ product_desc: text }) }} />

                                    <View style={{ flexDirection: 'row' }}>
                                        {product_img && product_img.map((item) => {
                                            return (
                                                <Image
                                                    key={product_img.indexOf(item)}
                                                    source={{ uri: product_img.length !== 0 ? item.path : '' }}
                                                    style={styles.imageStyle}
                                                />
                                            );
                                        })}
                                        {prevImgFromCamera}
                                        {thumbPhoto}
                                    </View>
                                    
                                    <TouchableOpacity
                                        activeOpacity={0.5}
                                        style={styles.btnSection}
                                        onPress={this.chooseFile}>
                                        <Text style={styles.btnText}>Choose Image</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        activeOpacity={0.5}
                                        style={styles.btnSection}
                                        onPress={this.takePicture}>
                                        <Text style={styles.btnText}>Take Picture</Text>
                                    </TouchableOpacity>
                                </Form>
                            </View>
                        </ScrollView>
                        <Button danger full rounded onPress={this.postProduct}>
                            <Text style={{ color: '#fff' }}> SUBMIT </Text>
                        </Button>
                    </Content>
                </Container>
            </>
        )
    }
}

const mapStateToProps = ({ auth }) => {
    return {
        auth
    };
};

export default connect(mapStateToProps)(AddProduct);

const styles = StyleSheet.create({

    textTitle: {
        fontSize: 34,
        fontWeight: 'bold'
    },
    btnSection: {
        width: 225,
        height: 50,
        backgroundColor: '#DCDCDC',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        marginBottom: 10
    },
    btnText: {
        textAlign: 'center',
        color: 'gray',
        fontSize: 14,
        fontWeight: 'bold'
    },
    size: {
        width: '100%',
        height: 40,
        // paddingVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderColor: '#9B9B9B',
        paddingHorizontal: 5,
        paddingBottom: 15
    },
    imageStyle: {
        width: 200,
        height: 200,
        width: 100,
        height: 100,
        margin: 5,
        borderColor: 'black',
        borderRadius: 5,
        borderWidth: 1,
    },
})