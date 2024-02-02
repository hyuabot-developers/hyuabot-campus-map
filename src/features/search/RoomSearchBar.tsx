import {useEffect, useMemo, useRef, useState} from "react";
import {Autocomplete, debounce, TextField} from "@mui/material";
import {gql, useQuery} from "@apollo/client";
import {RoomItem, RoomQueryResult} from "./RoomQueryResult";

const roomQuery = gql`
  query ($name: String!) {
    room (name: $name) {
      name
      number
      latitude
      longitude
      buildingName
    }
  }
`;

export default function RoomSearchBar() {
  const [value, setValue] = useState<RoomItem | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<readonly RoomItem[]>([]);
  const { refetch } = useQuery<RoomQueryResult>(roomQuery);
  const fetch = useMemo(
    () =>
      debounce(
        (
          request: { input: string },
          callback: (results?: readonly RoomItem[]) => void,
        ) => {
          refetch({name: request.input}).then(r => {
            callback(r.data.room);
          });
        },
        400,
      ),
    [],
  );

  useEffect(() => {
    let active = true;
    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }
    fetch({ input: inputValue }, (results?: readonly RoomItem[]) => {
      if (active) {
        let newOptions: readonly RoomItem[] = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <Autocomplete
      style={{
        marginLeft: "30px",
        marginRight: "30px",
        marginTop: "10px",
        marginBottom: "10px"
      }}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.name
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText={'검색 결과가 없습니다.'}
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => <TextField {...params} label="강의실 검색" />}
      renderOption={(props, option) => {
        return (
          <li {...props}>
            {option.name} ({option.buildingName} {option.number}호)
          </li>
        );
      }}
    />
  );
}