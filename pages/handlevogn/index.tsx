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
// todo use merging of css-rules instead here..

const ShoppingCart = () => {
  const { items, setItems } = useShoppingCartContext();

  const totalPrice = calculateTotalPrice(items);
  console.log(items);
  // todo wrap in form as well
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
                <TableHeader style={{ textAlign: "right" }}>Pris</TableHeader>
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
                      <img src={item.href} alt={item.title} height={120} />
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
                <CenterDataCell>Sum</CenterDataCell>
                <LeftDataCell />
                <LeftDataCell />
                <LeftDataCell style={{ textAlign: "right" }}>
                  {formatPrice(totalPrice)}
                </LeftDataCell>
              </TableRow>
              <TableRow>
                <CenterDataCell>Frakt</CenterDataCell>
                <LeftDataCell />
                <LeftDataCell>Posten u/ sporing</LeftDataCell>
                <LeftDataCell style={{ textAlign: "right" }}>
                  {formatPrice(189)}
                </LeftDataCell>
              </TableRow>
              <TableRow>
                <CenterDataCell>Totalsum</CenterDataCell>
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
