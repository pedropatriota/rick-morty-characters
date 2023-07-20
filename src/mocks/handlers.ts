import { rest } from "msw";
import { mockCharacters } from "./mockData";

export const handlers = [
  rest.get("https://rickandmortyapi.com/api/character", (req, res, ctx) => {
    const page = req.url.searchParams.get("page") as string;
    const currentPage = parseInt(page);

    const pageSize = 20;
    const offset = (currentPage - 1) * pageSize;
    const paginatedCharacters = mockCharacters.slice(offset, offset + pageSize);

    return res(
      ctx.status(200),
      ctx.json({
        results: paginatedCharacters,
        info: {
          next:
            currentPage < mockCharacters.length / pageSize
              ? String(currentPage + 1)
              : null,
        },
      })
    );
  }),
];
