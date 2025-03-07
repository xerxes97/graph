export const getCharactersQuery = (page: number = 1) => `
        query {
            characters(page: ${page}) {
                info {
                    next
                }
                results {
                    id
                    species
                    name
                    status
                    type
                    gender
                    origin {
                        id
                        name
                        }
                    location {
                        id
                        name
                        }
                    image
                }
            }
        }`;

        export const getLocations = `
        query {
            locations {
                info {
                    pages
                }
                results {
                    id
                    name
                    type
                    dimension
                    residents
                    url
                    created
                }
            }
        }`;