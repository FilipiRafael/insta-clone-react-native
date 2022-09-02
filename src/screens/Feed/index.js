import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList } from 'react-native';
import { Header } from '../../components/Header';
import { Post, Head, Avatar, Name, Description, Loading } from './styles';
import { LazyImage } from '../../components/LazyImage';

export const Feed = () => {

    const [feed, setFeed] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [viewable, setViewable] = useState([]);

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

    const handleViewableChanged = useCallback(({ changed }) => {
        setViewable(changed.map(({ item }) => item.id));
    }, []);

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
                onViewableItemsChanged={handleViewableChanged}
                viewabilityConfig={{ viewAreaCoveragePercentThreshold: 40 }}
                renderItem={({ item }) => (
                    <Post>
                        <Head>
                            <Avatar source={{ uri: item.author.avatar }} />
                            <Name>{item.author.name}</Name>
                        </Head>

                        <LazyImage
                            shouldLoad={viewable.includes(item.id)}
                            aspectRatio={item.aspectRatio}
                            source={{ uri: item.image }}
                            smallSource={{ uri: item.small }}
                        />

                        <Description>
                            <Name>{item.author.name}</Name> {item.description}
                        </Description>
                    </Post>
                )}
            />
        </View>
    )
}