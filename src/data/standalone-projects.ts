// マークダウンファイルを持たない独立したプロジェクト（Astroページ）の定義

export interface StandaloneProject {
  title: string;
  description: string;
  pubDate: Date;
  category: string;
  tags: string[];
  slug: string;
  basePath: string;
  draft?: boolean;
}

export const standaloneProjects: StandaloneProject[] = [
  {
    title: "サンプルサイズ計算機",
    description: "統計的検定に必要なサンプルサイズを簡単に計算できるインタラクティブツール",
    pubDate: new Date("2026-01-06"),
    category: "統計ツール",
    tags: ["統計", "サンプルサイズ", "検定力分析", "ツール"],
    slug: "sample-size-calculator/app",
    basePath: "projects",
    draft: false
  }
  // 今後、他の独立したプロジェクトをここに追加
];
