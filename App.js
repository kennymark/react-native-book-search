import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, ImageBackground } from 'react-native';
import { ReactiveBase, DataSearch, ReactiveList } from '@appbaseio/reactivesearch-native';
import Rating from 'react-native-star-rating';

export default class App extends React.Component {
	constructor(props) {
		super();
		this.state = {
			isReady: false
		};
	}

	async componentWillMount() {
		await Expo.Font.loadAsync({
			Roboto: require('native-base/Fonts/Roboto.ttf'),
			Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
			Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf')
		});
		this.setState({ isReady: true });
	}
	render() {
		if (!this.state.isReady) {
			return (
				<View style={styles.container}>
					<Text>Loading...</Text>
				</View>
			);
		}
		return (
			<ReactiveBase app="ecommsearch" credentials="KsWaeNfHz:07aaa8c3-2c08-4a92-bfe6-f81e35b844af">
				<ScrollView>
					<View style={styles.container}>
						<DataSearch
							componentId="searchbox"
							dataField={[ 'original_title', 'original_title.search', 'authors', 'authors.search' ]}
							placeholder="Search for books"
							autosuggest={false}
						/>
						<ReactiveList
							componentId="results"
							dataField="authors"
							size={5}
							autosuggest
							showResultStats={false}
							pagination={true}
							react={{
								and: 'searchbox'
							}}
							onData={(res) => (
								<View style={styles.result}>
									<ImageBackground source={{ uri: res.image }} style={styles.image} />
									<View style={styles.item}>
										<Text style={styles.title}>{res.original_title}</Text>
										<Text style={styles.author}>{res.authors}</Text>
										<View style={styles.ratebox}>
											<Rating
												starStyle={styles.rating}
												disabled={true}
												maxStars={5}
												starSize={20}
												rating={res.average_rating}
												fullStarColor={'coral'}
											/>
										</View>
									</View>
								</View>
							)}
						/>
					</View>
				</ScrollView>
			</ReactiveBase>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		marginTop: 45
	},
	image: {
		width: '35%',
		height: '100%'
	},
	result: {
		flexDirection: 'row',
		width: '100%',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#efefef',
		marginTop: 20,
		minHeight: 130
	},
	item: {
		flexDirection: 'column',
		justifyContent: 'center',
		paddingLeft: 20
	},
	title: {
		fontWeight: 'bold',
		fontSize: 15,
		maxWidth: '80%'
	},
	author: {
		paddingTop: 5
	},
	ratebox: {
		justifyContent: 'center'
	},
	rating: {
		paddingTop: 10
	}
});
