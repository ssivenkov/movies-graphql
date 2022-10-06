import React, { useEffect, useState } from 'react';

import { PosterSize, useMoviesQuery } from 'apollo/generated/schema';
import { CardsContainer } from 'common/components/cardsContainer/cardsContainer';
import ListItemCard from 'common/components/listItemCard/ListItemCard';
import { Loader } from 'common/components/loader/Loader';
import { LoaderContainer } from 'common/components/loader/LoaderContainer';
import { PageContainer } from 'common/components/pageContainer/pageContainer';
import { PageTitle } from 'common/components/pageTitle/pageTitle';
import { NOTIFICATION_TIMEOUT } from 'common/constants/constants';
import { useInView } from 'react-cool-inview';
import { ToastContainer } from 'react-toastify';
import { PATH } from 'types/enum/Path';

export const MoviesPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    loading: firstQueryLoading,
    error,
    data,
    fetchMore,
  } = useMoviesQuery({
    variables: {
      after: null,
      first: 12,
      size: PosterSize.W500,
    },
  });

  const hasNextPage = data?.movies?.topRated?.pageInfo?.hasNextPage;

  const loadMoreItems = () => {
    if (hasNextPage) {
      const endCursor = data?.movies?.topRated?.pageInfo?.endCursor;

      fetchMore({
        variables: { after: endCursor },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          if (
            Array.isArray(fetchMoreResult.movies?.topRated?.edges) &&
            Array.isArray(prevResult.movies?.topRated?.edges)
          ) {
            fetchMoreResult.movies.topRated.edges = [
              ...prevResult.movies.topRated.edges,
              ...fetchMoreResult.movies.topRated.edges,
            ];

            return fetchMoreResult;
          } else return fetchMoreResult;
        },
      }).finally(() => setLoading(false));
    }
  };

  const { observe } = useInView({
    // For better UX, we can grow the root margin so the data will be loaded earlier
    rootMargin: '50px 0px',
    // When the last item comes to the viewport
    onEnter: ({ unobserve }) => {
      unobserve(); // Pause observe when loading data
      setLoading(true);
      setCurrentPage((prevState) => prevState + 1);
    },
  });

  useEffect(() => {
    loadMoreItems();
  }, [currentPage]);

  if (firstQueryLoading) {
    return (
      <PageContainer>
        <ToastContainer autoClose={NOTIFICATION_TIMEOUT} />
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <ToastContainer autoClose={NOTIFICATION_TIMEOUT} />
        <div>{error.message}</div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <ToastContainer autoClose={NOTIFICATION_TIMEOUT} />
      <PageTitle>Movies</PageTitle>
      <CardsContainer>
        {data?.movies?.topRated?.edges?.map((item, index, array) => {
          const isLastElement = index === array.length - 1;

          return (
            <ListItemCard
              key={item?.node?.id}
              linkTo={`../${PATH.MOVIE}/${item?.node?.id}`}
              poster={
                item?.node?.images.posters && item?.node?.images.posters.length > 0
                  ? item?.node?.images.posters[0].image
                  : ''
              }
              ref={isLastElement ? observe : null}
              title={item?.node?.title ?? ''}
            />
          );
        })}
        {loading && <Loader />}
      </CardsContainer>
    </PageContainer>
  );
};
