import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const ProductPagination = ({totalPages}) => {
    return (
        <div>
            <div>
                <Stack spacing={2}>
                <Pagination
                    count={totalPages}
                    color="primary"
                />
                </Stack>
            </div>
        </div>
    )
};

export default ProductPagination;