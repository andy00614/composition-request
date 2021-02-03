export async function getUser(userName: string): Promise<any[]> {
  const url = `https://mock.corp.kuaishou.com/mock/602/dataplatform/idp/passport/dev/group/user?userName=${userName}`;
  const data = await fetch(url);
  const res = await data.json();
  return res.data;
}
