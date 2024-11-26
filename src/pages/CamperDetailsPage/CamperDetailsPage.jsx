import { useParams } from 'react-router-dom';

const CamperDetailsPage = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Camper Details</h1>
      <p>Details for camper ID: {id}</p>
      {/* Info about camper will be added soon */}
    </div>
  );
};

export default CamperDetailsPage;
