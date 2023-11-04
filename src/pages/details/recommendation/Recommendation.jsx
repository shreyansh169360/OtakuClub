import React from "react";

import RecommendationCarousel from "./RecommendationCarousel";
import useFetch from "../../../hooks/useFetch";

const Recommendation = ({ mediaType, id }) => {
    const { data, loading, error } = useFetch(
        `/${mediaType}/${id}/recommendations`
    );

    return (
        <RecommendationCarousel
            title="Recommendations"
            data={data?.data}
            loading={loading}
            mediaType={mediaType}
        />
    );
};

export default Recommendation;