export const getOneDataQuery = async (
  model,
  where: object,
  attributes?: string[] | string[][]
) => {
  try {
    return await model.findOne({ where, attributes });
  } catch (error) {
    throw error;
  }
};

export const createDataQuery = async (model, data: object) => {
  try {
    return await model.create(data);
  } catch (error) {
    throw error;
  }
};
