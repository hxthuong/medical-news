"use client";

import {
  ConfigProps,
  InfoSiteProps,
  KeywordProps,
  VisitProps,
} from "@/types/config";
import { NewsProps } from "@/types/news";
import { loadData, saveData } from "@/utils/secureStorage";
import { useEffect, useState } from "react";

const KEY_CONFIG = "CONFIG_DATA";

export function useConfig(lang: string = "vi") {
  const [config, setConfig] = useState<ConfigProps>();
  const [menuConfig, setMenuConfig] = useState<NewsProps[]>([]);
  const [languages, setLanguages] = useState<KeywordProps[]>([]);
  const [keyword, setKeyword] = useState<KeywordProps[]>([]);
  const [infoSite, setInfoSite] = useState<InfoSiteProps>();
  const [visits, setVisits] = useState<VisitProps>();
  const [loading, setLoading] = useState(true);

  const storedConfig = loadData<ConfigProps>(KEY_CONFIG);

  useEffect(() => {
    if (storedConfig) {
      //Lấy dữ liệu từ storage
      setConfig(storedConfig);
      setLoading(false);
    } else {
      //Nếu không có thì fetch từ API
      fetchConfig(lang);
    }
  }, [storedConfig]);

  useEffect(() => {
    if (config) {
      setMenuConfig(config?.menu || []);
      setLanguages(config?.list_ngonngu || []);
      setKeyword(config?.tukhoa || []);
      setInfoSite(config?.info_site);
      setVisits(config?.truycap);
    }
  }, [config]);

  const fetchConfig = async (language: string) => {
    setLoading(true);
    try {
      // Fetch API data
      const res = await fetch(`/api/config?lang=${language}`);
      const text = await res.text();
      if (!text) throw new Error("Empty response from server");
      const json: ConfigProps = JSON.parse(text);

      setConfig(json);
      if (json) {
        saveData(KEY_CONFIG, json);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    config,
    menuConfig,
    languages,
    keyword,
    infoSite,
    visits,
    loading,
    refreshConfig: fetchConfig,
  };
}
