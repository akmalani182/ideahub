export const getOneDataQuery = async (
  model,
  where: object,
  attributes?: string[] | string[][],
  include?: object[]
) => {
  try {
    return await model.findOne({ where, attributes, include });
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

export const updateDataQuery = async (
  model,
  data: object,
  where: object
) => {
  try {
    return await model.update(data, { where });
  } catch (error) {
    throw error;
  }
};