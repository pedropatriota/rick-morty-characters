/* eslint-disable no-constant-condition */
import type { IApiResponse, ICharacterProps } from "./contracts";

const preparedQuery = (page: number) => {
  const url = `https://rickandmortyapi.com/api/character/?page=${page}`;

  return encodeURI(url);
};

// Function to fetch data from a specific page of the API
async function fetchData(page: number): Promise<IApiResponse | undefined> {
  const URL = preparedQuery(page);
  try {
    const response = await fetch(URL);
    const data = (await response.json()) as IApiResponse;
    return data;
  } catch (err) {
    console.log(err);
  }
}

// Function to fetch data from all pages and store it in an array
async function fetchAllData(): Promise<ICharacterProps[]> {
  const allData: ICharacterProps[] = [];
  let currentPage = 1;

  while (true) {
    const data = await fetchData(currentPage);
    if (data) {
      allData.push(...data.results);
      if (data?.info.next === null) {
        break;
      }
      currentPage++;
    }
  }

  return allData;
}

function search(query: string, data: ICharacterProps[]): ICharacterProps[] {
  const results = data.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );
  return results;
}

export const searchData = async (value: string) => {
  try {
    const allData: ICharacterProps[] = await fetchAllData();
    const query = value;
    const searchResults = search(query, allData);
    return searchResults;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
