import React from "react"
import {  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,} from "./FooterStyles"

const Footer = () => {
  return (
    <Box>
      <Container>
        <Row>
          <Column>
            <Heading>Contact Us</Heading>
            
            <FooterLink href="#">mail</FooterLink>
          </Column>
          
        </Row>
      </Container>
      <div style={{
        textAlign: "center"
      }}>
        <p style={{color:"white"}}>Copyright 2022 © WebsiteWhereYouAreTheHero contributors</p>
      </div>
    </Box>
  )
}
export default Footer
