const mergeBody = (oldBody, newBody) => {
  if (Array.isArray(oldBody)) {
    return [...oldBody, ...newBody];
  }
  const items = oldBody.items;
  if (items) {
    const newItems = newBody.items;
    return {
      ...newBody,
      items: [...items, ...newItems],
    };
  }
  return oldBody;
};

export default mergeBody;
