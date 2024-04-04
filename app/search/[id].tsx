import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    TouchableOpacity,
    View
} from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { Text, SafeAreaView } from 'react-native';
import axios from 'axios';
import { COLORS, SIZES } from '../../theme';
import styles from '../../styles';
import { MaterialIcons } from '@expo/vector-icons';

const JobSearch = () => {
    const params = useLocalSearchParams();
    const router = useRouter();
    const [searchResult, setSearchResult] = useState([]);
    const [searchLoader, setSearchLoader] = useState(false);
    const [searchError, setSearchError] = useState(null);
    const [page, setPage] = useState(1);
    const data = [
        {
            "_id": "660eab9e6cf13729fa9c04b1",
            "from": "Tepela",
            "body": "When you are in westlands you don't have to go to town there are supemetro busses at the Galitos coridor, it is 90 bob to Juja, there might be long lines",
            "comments": [],
            "upvotes": 0,
            "__v": 0
        }
    ]

    const handleSearch = async () => {
        setSearchLoader(true);
        setSearchResult([]);

        try {
            const options = {
                method: 'GET',
                url: ``,
                headers: {},
                params: {
                    query: params.id,
                    page: page.toString()
                }
            };

            const response = await axios.request(options);
            setSearchResult(response.data.data);
        } catch (error) {
            setSearchError(error);
            console.log(error);
        } finally {
            setSearchLoader(false);
        }
    };

    const handlePagination = direction => {
        if (direction === 'left' && page > 1) {
            setPage(page - 1);
            handleSearch();
        } else if (direction === 'right') {
            setPage(page + 1);
            handleSearch();
        }
    };

    useEffect(() => {
        handleSearch();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      

            <FlatList
                data={searchResult}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.container}>
                        <View style={styles.textContainer}>
                            <Text style={styles.jobName} numberOfLines={1}>
                                hello
                            </Text>

                            <Text style={styles.jobType}>hello</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.job_id}
                contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
                ListHeaderComponent={() => (
                    <>
                        <View style={styles.container}>
                            <Text style={styles.searchTitle}>{params.id}</Text>
                            <Text style={styles.noOfSearchedJobs}>Locations</Text>
                        </View>
                        <View style={styles.loaderContainer}>
                            {searchLoader ? (
                                <ActivityIndicator size='large' color={COLORS.primary} />
                            ) : (
                                searchError && <Text>Oops something went wrong</Text>
                            )}
                        </View>
                    </>
                )}
                ListFooterComponent={() => (
                    <View style={styles.footerContainer}>
                        <TouchableOpacity
                            style={styles.paginationButton}
                            onPress={() => handlePagination('left')}
                        >
                            <MaterialIcons
                                size={25}
                                name="arrow-back-ios"
                                color="#fff"
                            />
                        </TouchableOpacity>
                        <View style={styles.paginationTextBox}>
                            <Text style={styles.paginationText}>{page}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.paginationButton}
                            onPress={() => handlePagination('right')}
                        >
                            <MaterialIcons
                                size={25}
                                name="arrow-forward-ios"
                                color="#fff"
                            />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

export default JobSearch;