 const LoadMoreData = ({ state, fetchDataFun }) => {
    if (state === null || fetchDataFun === null) {
        return;
    }
    // ตรวจสอบว่า fetchDataFun ไม่เป็น undefined ก่อนที่จะใช้
    if (fetchDataFun !== undefined && state.totalDocs > state.results.length) {
      return (
        <button onClick={() => fetchDataFun({ page: state.page + 1 })}>
          Load More
        </button>
      );
    } else {
      return;
    }
  };
  export default LoadMoreData;