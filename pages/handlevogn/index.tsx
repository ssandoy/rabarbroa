import PageWrapper from "../../components/page-wrapper/page-wrapper";
import { useShoppingCartContext } from "../../context/cart/ShoppingCartContext";
import styled from "@emotion/styled";
import {
  calculateTotalPrice,
  removeImageFromImages,
} from "../../firebase/domain";
import { formatPrice } from "../bilder";
import React from "react";
import { device } from "../../styles/mixins";
import { formatPictureRoute } from "../../routes/routes";
import { Heading1, SubmitButton } from "../../styles/global";
import { CrossIcon } from "../../components/cross/CrossIcon";

const TableWrapper = styled.form`
  width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (${device.FOR_PHONE_ONLY}) {
    width: 85vw;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  text-align: left;
  font-weight: lighter;
`;

const DataCell = styled.td`
  padding: 8px 0;
`;

const LeftDataCell = styled(DataCell)`
  text-align: left;
`;

const CenterDataCell = styled(DataCell)`
  text-align: center;
  cursor: pointer;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid black;
`;
// fixme try to enable css-prop here instead..

const ShoppingCart = () => {
  const { items, setItems } = useShoppingCartContext();

  const totalPrice = calculateTotalPrice(items);
  // todo radiobuttons for frakt
  // todo different width for image based on screensize
  return (
    <PageWrapper>
      <Heading1>Handlevogn</Heading1>
      {items.length > 0 ? (
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <TableHeader>&nbsp;</TableHeader>
                <TableHeader style={{ textAlign: "center" }}>Bilde</TableHeader>
                <TableHeader>Tittel</TableHeader>
                <TableHeader style={{ textAlign: "center" }}>Pris</TableHeader>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <TableRow key={item.title}>
                  <CenterDataCell
                    onClick={() => {
                      const newItems = removeImageFromImages(items)(item);
                      setItems(newItems);
                    }}
                  >
                    <CrossIcon />
                  </CenterDataCell>
                  <CenterDataCell>
                    <a href={formatPictureRoute(item.title.replace(" ", "-"))}>
                      <img src={item.href} alt={item.title} width={95} />
                    </a>
                  </CenterDataCell>
                  <LeftDataCell style={{ color: "#5D6956" }}>
                    {item.title}
                  </LeftDataCell>
                  <LeftDataCell
                    style={{ textAlign: "right", color: "#5D6956" }}
                  >
                    {formatPrice(item.price)}
                  </LeftDataCell>
                </TableRow>
              ))}
              <TableRow>
                <LeftDataCell style={{ paddingLeft: 8 }}>Sum</LeftDataCell>
                <LeftDataCell />
                <LeftDataCell />
                <LeftDataCell style={{ textAlign: "right" }}>
                  {formatPrice(totalPrice)}
                </LeftDataCell>
              </TableRow>
              <TableRow>
                <LeftDataCell style={{ paddingLeft: 8 }}>Frakt</LeftDataCell>
                <LeftDataCell />
                <LeftDataCell>Posten u/ sporing</LeftDataCell>
                <LeftDataCell style={{ textAlign: "right" }}>
                  {formatPrice(189)}
                </LeftDataCell>
              </TableRow>
              <TableRow>
                <LeftDataCell style={{ paddingLeft: 8 }}>Totalt</LeftDataCell>
                <LeftDataCell />
                <LeftDataCell />
                <LeftDataCell style={{ textAlign: "right" }}>
                  {formatPrice(totalPrice + 189)}
                </LeftDataCell>
              </TableRow>
            </tbody>
          </Table>
          <SubmitButton style={{ marginTop: 24 }} type="submit">
            Fortsett til betaling
          </SubmitButton>
        </TableWrapper>
      ) : (
        <TableWrapper>
          <p>Handlevognen er for øyeblikket tom.</p>
          Gå til bilder her via knapp
        </TableWrapper>
      )}
    </PageWrapper>
  );
};

export default ShoppingCart;
