import { useState, useEffect, useCallback } from 'react';
import {
  GoogleSpreadsheet,
  GoogleSpreadsheetWorksheet,
  GoogleSpreadsheetRow,
} from 'google-spreadsheet';

import { errorToast, customToast } from 'utils/toast';
import MapData from 'constants/mapData';
import {
  SHEET_DOC_ID,
  SHEET_ID,
  SHEET_COLUMN_KEY,
  GOOGLE_SERVICE_CLIENT_EMAIL,
  GOOGLE_SERVICE_PRIVATE_KEY,
} from '../constants/googlesheet';

const CACHE = {
  mapData: null,
  googleSheet: {
    doc: new GoogleSpreadsheet(SHEET_DOC_ID),
    sheet: null,
    rows: null,
  },
};

export default function useGoogleSheet() {
  const [sheetMapData, setSheetMapData] = useState([]);

  const addNewMapDataToSheet = useCallback(async (placeInfo) => {
    const addedRows = [
      {
        ...placeInfo,
      },
    ];
    if (CACHE?.googleSheet?.sheet && addedRows.length > 0) {
      return CACHE?.googleSheet?.sheet?.addRows(addedRows);
    }
    return false;
  }, []);

  useEffect(() => {
    (async () => {
      if (CACHE?.mapData && CACHE?.googleSheet.sheet) return;

      const { doc } = CACHE?.googleSheet;
      await doc.useServiceAccountAuth({
        client_email: GOOGLE_SERVICE_CLIENT_EMAIL || '',
        private_key: GOOGLE_SERVICE_PRIVATE_KEY || '',
      });

      await doc.loadInfo(); // loads document properties and worksheets
      const sheetObj = doc.sheetsById[SHEET_ID];
      if (!sheetObj) return;
      const rowsObj = await sheetObj.getRows();
      CACHE.googleSheet = {
        ...CACHE?.googleSheet,
        sheet: sheetObj,
        rows: rowsObj,
      };

      const mapData = CACHE.googleSheet.rows.map(
        ({
          address,
          drink,
          food,
          kakaoId,
          latitude,
          longitude,
          name,
          naverId,
          phone,
          url,
        }) => {
          return {
            address,
            drink,
            food,
            kakaoId,
            latitude,
            longitude,
            name,
            naverId,
            phone,
            url,
          };
        }
      );

      CACHE.mapData = mapData;
      setSheetMapData(mapData);
    })();
  }, [sheetMapData]);

  return {
    sheetMapData,
    addNewMapDataToSheet,
  };
}
