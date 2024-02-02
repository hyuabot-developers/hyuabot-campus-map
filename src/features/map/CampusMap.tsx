import React, {useState} from 'react';

import {Map, MapMarker} from "react-kakao-maps-sdk";
import { gql, useQuery } from "@apollo/client";
import {BuildingItem, BuildingQueryResult} from "./BuildingQueryResult";
import {store} from "../../app/store";
import {useDispatch} from "react-redux";
import {setResult} from "./mapSlice";

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
  const EventMarkerContainer = ({ position, building }: { position: { lat: number, lng: number }, building: BuildingItem }) => {
    const [isVisible, setIsVisible] = useState(false)

    return (
      <MapMarker
        position={position}
        onClick={() => setIsVisible(!isVisible)}>
        {isVisible &&
          <div style={{
            width: '200px',
            backgroundColor: 'white',
            padding: '5px',
            borderRadius: '10px',
            textAlign: "center",
            textOverflow: "ellipsis",
          }}>
            {building.name}
            <br/>
            { building.url && (
              <a href={building.url} target="_blank" rel="noreferrer">
                내부 구조도
              </a>
            )}
          </div>
        }
      </MapMarker>
    )
  }

  const { refetch } = useQuery<BuildingQueryResult>(mapQuery);
  const [ buildings, setBuildings ] = useState<BuildingItem[]>([]);
  const dispatch = useDispatch();
  store.subscribe(() => {
    setBuildings(store.getState().map.result);
  });
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
        }).then((result) => {
          dispatch(setResult(result.data?.building));
        });
      }}
    >
      {buildings?.map((building) => (
        <EventMarkerContainer
          key={building.name}
          position={{ lat: building.latitude, lng: building.longitude }}
          building={building}
        />
      ))}
    </Map>
  );
}
