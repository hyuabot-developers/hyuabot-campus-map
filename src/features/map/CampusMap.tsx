import React from 'react';

import { useAppDispatch } from '../../app/hooks';
import { Map } from "react-kakao-maps-sdk";
import { store } from "../../app/store";
import { setBound } from "./mapSlice";
import {gql, useQuery} from "@apollo/client";

const mapQuery = gql`
  query ($north: Float!, $south: Float!, $west: Float!, $east: Float!) {
    building (north: $north, south: $south, west: $west, east: $east) {
      name
      latitude
      longitude
      url
    }
  }
`;


export function CampusMap() {
  const dispatch = useAppDispatch();
  const { data, loading, error, refetch } = useQuery(mapQuery);
  const onChange = () => {
    const state = store.getState();
    refetch({
      north: state.map.bound.getNorthEast().getLat(),
      south: state.map.bound.getSouthWest().getLat(),
      west: state.map.bound.getSouthWest().getLng(),
      east: state.map.bound.getNorthEast().getLng()
    }).then(r => console.log(r));
  }
  store.subscribe(onChange);

  return (
    <Map
      center={{ lat: 37.29753535479288, lng: 126.83544659517665 }}
      level={2}
      style={{width: '100%', height: '100vh'}}
      onTileLoaded={(map) => {
        dispatch(setBound(map.getBounds()));
      }}
    />
  );
}
