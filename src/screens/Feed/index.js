import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { Header } from '../../components/Header';
import { Post, Head, Avatar, Name, PostImage, Description, Loading } from './styles';

export const Feed = () => {

    const [feed, setFeed] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const loadPage = async (pageNumber = page, shouldRefresh = false) => {

        if (total && pageNumber > total) return;

        setLoading(true);

        const response = await fetch(`http://localhost:3000/feed?_expand=author&_limit=5&_page=${pageNumber}`);

        const data = await response.json();
        const totalItems = response.headers.get('X-Total-Count');

        setTotal(Math.floor(totalItems / 5));
        setFeed(shouldRefresh ? data : [...feed, ...data]);
        setPage(pageNumber + 1);
        setLoading(false);
    }

    const refreshList = async () => {
        setRefreshing(true);

        await loadPage(1, true);

        setRefreshing(false);
    }

    useEffect(() => {
        loadPage();
    }, []);

    return(
        <View>
            <Header />
            <FlatList
                data={feed}
                key={post => String(post.id)}
                onEndReached={() => loadPage()}
                onEndReachedThreshold={0.1}
                ListFooterComponent={loading && <Loading />}
                onRefresh={refreshList}
                refreshing={refreshing}
                renderItem={({ item }) => (
                    <Post>
                        <Head>
                            <Avatar source={{ uri: item.author.avatar }} />
                            <Name>{item.author.name}</Name>
                        </Head>

                        <PostImage ratio={item.aspectRatio} source={{ uri: item.image }} />

                        <Description>
                            <Name>{item.author.name}</Name> {item.description}
                        </Description>
                    </Post>
                )}
            />
        </View>
    )
}