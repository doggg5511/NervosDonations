import {Box, Button, Container, Text, Title} from '@mantine/core';
import {Link} from "react-router-dom";

export const NotFoundPage = () => {
    return (
        <Box>
            <Title>404</Title>
            <Text>You have found a secret place.</Text>
            <Button component={Link} to={'/'} variant="subtle" size="md">
                Take me back to home page
            </Button>
        </Box>
    );
};