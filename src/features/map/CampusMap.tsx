import React from 'react';

import { Map } from "react-kakao-maps-sdk";
import { gql, useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { BuildingQueryResult } from "./BuildingQueryResult";

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
  const { data, refetch } = useQuery<BuildingQueryResult>(mapQuery);
  if (data !== undefined) {
    console.log(data);
  }

  return (
    <Map
      center={{ lat: 37.29753535479288, lng: 126.83544659517665 }}
      level={2}
      style={{width: '100%', height: '100vh'}}
      onTileLoaded={(map) => {
        refetch({
          north: map.getBounds().getNorthEast().getLat(),
          south: map.getBounds().getSouthWest().getLat(),
          west: map.getBounds().getSouthWest().getLng(),
          east: map.getBounds().getNorthEast().getLng()
        }).then((result) => {});
      }}
    />
  );
}
